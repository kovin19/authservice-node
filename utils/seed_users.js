import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  const firstName = "User";
  const lastName = "Admin";
  const email = "correo@mail.com";
  const password = "12345";

  const exists = await prisma.user.findUnique({ where: { email } });

  if (!exists) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        isActive: true,
        password: hashedPassword,
      },
    });

    console.log("Usuario administrador precargado");
  } else {
    console.log("Usuario administrador ya existe");
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
