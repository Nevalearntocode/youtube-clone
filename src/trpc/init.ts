import { db } from "@/db";
import { users } from "@/db/schema";
import { ratelimit } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  // The auth() helper returns the Auth object of the currently active user which is store in the session as a token, so it means we don't do any fetching here.
  const { userId } = await auth();
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { clerkUserId: userId };
});

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async function isAuth(opts) {
  const { ctx } = opts;

  if (!ctx.clerkUserId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, ctx.clerkUserId));

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
  }

  const { success } = await ratelimit.limit(user.id);

  if (!success) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests",
    });
  }

  return opts.next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
