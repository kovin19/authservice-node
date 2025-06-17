import { userSchema } from "../schemas/users.schema.js"

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if(error) {
        const messages = error.details.map(detail => detail.message);
        return res.status(400).json({errors:messages});
    }

    next();
}