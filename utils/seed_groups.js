const {PrismaClient} = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function seed() {
    const groups = [
        {name: "Administrador"},
        {name: "Administrador sistema"},
        {name: "Colaborador"}
    ]

    for(const group in groups) {
        await prisma.group.upsert({
            where: {name: group.name},
            update: {},
            create: group
        });
    }

    console.log("Grupos creados")
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