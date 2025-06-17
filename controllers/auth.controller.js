import { loginService } from "../services/auth.service.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await loginService(email, password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}