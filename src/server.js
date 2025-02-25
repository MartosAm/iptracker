require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const ipRoutes = require("./routes/ipRoutes");
app.use("/ip", ipRoutes);

app.use("/api", ipRoutes);

app.get("/", (req, res) => {
    res.send("API de rastreo de IP funcionando 🚀");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


console.log("aver si jala ya estoy en la rama master y voy a hacer un push")