import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
  {
    email: "seed1@gmail.com",
    password: "seed1_password",
  },
  {
    email: "seed2@gmail.com",
    password: "seed2_password",
  },
];

async function main() {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
