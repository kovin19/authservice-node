const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
    const email = "correo@mail.com";
    const password = "12345";

    const exists = await prisma.user.findUnique({where: {email}});

    if(!exists) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        console.log("Usuario administrador precargado")
    } else console.log("Usuario administrador ya existe")
}

if (require.main === module) {
  seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = seed;