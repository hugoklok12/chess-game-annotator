import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const tags: string[] = [
    "Own blunder",
    "Opponent blunder",
    "Endgame",
    "Tactical",
    "Insightful",
    "Positional",
  ];
  tags.forEach(async (tag) => {
    return prisma.tag.upsert({
      where: {
        name: tag,
      },
      create: {
        name: tag,
      },
      update: {
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
