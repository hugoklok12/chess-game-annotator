import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tags: string[] = [
    "Blunder by me",
    "Blunder by opponent",
    "Endgame",
    "Insightful",
    "Tactics",
    "Positional",
  ];
  tags.forEach(async (tag) => {
    return await prisma.tag.upsert({
      where: { name: tag },
      update: {},
      create: {
        name: tag,
      },
    });
  });
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
