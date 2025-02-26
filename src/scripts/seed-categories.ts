import { db } from "@/db";
import { categories } from "@/db/schema";

const categoriesNames = [
  "Gaming",
  "Music",
  "Education",
  "Entertainment",
  "Sports",
  "Travel",
  "Food",
  "Fashion",
  "Lifestyle",
  "Business",
  "Technology",
  "Health",
  "Fitness",
  "Wellness",
  "Art and Design",
  "Personal Finance",
  "Home and Garden",
];

async function main() {
  console.log("Seeding categories...");

  try {
    const values = categoriesNames.map((name) => {
      return {
        name,
        slug: name
          .split(" ")
          .map((word) => word.toLowerCase())
          .join("-"),
        description: `Videos related to ${name.toLocaleLowerCase()}`,
      };
    });

    await db.insert(categories).values(values);

    console.log("Categories seeded successfully");
  } catch (error) {
    console.log("Error seeding categories", error);
    process.exit(1);
  }
}

main();
