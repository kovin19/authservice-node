require("dotenv").config();
const setupSwagger = require('./swagger');

const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cors = require("cors");
const morgan = require('morgan');

const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"];

app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(morgan('dev')); 


app.use("/auth", authRoutes);
setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http:localhost:${PORT}`);
    console.log('Swagger en http://localhost:3000/api-docs');
})