import { Photoscope } from "./generated/prisma/enums";
import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.customer.create({
    data: {
      email: "susan@prisma.io",
      username: "susan123",
      password: "password123",
      searchSessions: {
        create: {
          targetScope: Photoscope.ASTROPHOTOGRAPHY,
          maxBudget: 1800.0,
          isBeginner: true,
          // preferredBrand and preferredQuality are optional, so we can skip them
        },
      },
    },
    include: {
      searchSessions: true,
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.customer.findMany({
    include: {
      searchSessions: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });