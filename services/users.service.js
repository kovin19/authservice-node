import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const findAllUsersService = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            secondLastName: true,
            isActive: true,
            groups: true,
        }
    });
    return users;
}

export const createUserService = async (userData) => {
    const { firstName, lastName, secondLastName, email, password} = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            secondLastName: secondLastName,
            email: email,
            isActive: true,
            password: hashedPassword
        }
    })
}

export const findUserByIdService = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            secondLastName: true,
            email: true,
            isActive: true,
            groups: true
        }
    })

    if(!user) throw new Error('No se encontró un usuario con el ID proporcionado');

    return user;
}

export const updateUserService = async (id, userData) => {
    const user = await prisma.user.update({
        where: { id },
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            secondLastName: userData.secondLastName,
            email: userData.email
        }
    })
}