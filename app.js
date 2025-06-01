require("dotenv").config();
const setupSwagger = require('./swagger');

const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(morgan('dev')); 


app.use("/auth", authRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http:localhost:${PORT}`);
    console.log('Swagger en http://localhost:3000/api-docs');
})