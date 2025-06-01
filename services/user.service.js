const bcrypt = require("bcrypt");

const { Prisma, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function createUser(email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email, 
        password: hashedPassword
      },
    })
    
    return user;
  } catch(error) {
    if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new Error("Correo electrónico en uso");
    } else throw error;
  }
}

module.exports = {
  findUserByEmail,
  createUser,
};
