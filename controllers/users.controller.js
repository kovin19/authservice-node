import { findAllUsersService, createUserService, findUserByIdService, updateUserService } from "../services/users.service.js";

export const findAllUsers = async (req, res) => {
    const users = await findAllUsersService();

    return res.status(200).json(users);
}

export const createUser = async(req, res) => {
    await createUserService(req.body);

    return res.status(201).json({'message':'Se ha dado de alta el usuario'});
}

export const findUserById = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        throw new Error('El ID proporcionado no es válido');
    }

    const user = await findUserByIdService(id);

    return res.status(200).json(user)
}

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        throw new Error('El ID proporcionado no es válido');
    }

    await updateUserService(id, req.body);

    return res.status(200).json({'message':'Se han actualizado los datos del usuario'});
}