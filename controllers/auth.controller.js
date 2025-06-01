const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const { findUserByEmail, createUser } = require('../services/user.service');

async function login(request, response) {

    const { email, password } = request.body;

    try {
        const user = await findUserByEmail(email);

        if(!user) return response.status(401).json({error:"Correo electrónico o contraseña inváidos"});

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return response.status(401).json({error:"Correo electrónico o contraseña inválidos"});

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});

        return response.json({token});
    } catch(error) {
        console.log(error);
        return response.status(500).json({error: "Ocurrió un error en el servidor"});
    }
}

async function register(request, response) {
    const {email, password} = request.body;
    
    try {
        const user = await createUser(email, password);

        return response.status(200).json({message: "Se ha dado de alta el usuario"});
    } catch(error) {
        return response.status(400).json({error: error.message});
    }
}

module.exports = {login, register};