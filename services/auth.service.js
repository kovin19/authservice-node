import { PrismaClient } from '@prisma/client';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const loginService = async (email, password) => {
    const user = await prisma.user.findUnique({where: {email: email}});

    if(!user) throw new Error('Correo electrónico inválido');

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) throw new Error('Contraseña inválida');

    const payload = {
        id: user.id,
        email: user.email,
    }

    const options = {
        expiresIn: '1h',
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, options);

    return token;
}