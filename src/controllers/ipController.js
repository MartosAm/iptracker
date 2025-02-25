const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const searchIP = async (req, res) => {
    const { ip } = req.params;
    const userId = req.user.userId; // Obtenemos el ID del usuario autenticado

    try {
        // Llamamos a la API externa
        const response = await axios.get(`https://ip.guide/${ip}`);
        const data = response.data;

        // Guardamos la consulta en la base de datos
        const savedQuery = await prisma.ipQuery.create({
            data: {
                userId,
                ip,
                result: data,
            },
        });

        res.json({ message: "Consulta exitosa", data: savedQuery });
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ error: "No se pudo obtener información de la IP" });
    }
};

const getQueries = async (req, res) => {
    const userId = req.user.userId;

    try {
        const queries = await prisma.ipQuery.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        res.json({ message: "Historial de consultas", data: queries });
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener el historial" });
    }
};



const getIPDetails = async (req, res) => {
    try {
        const { ip } = req.params;  // Obtiene la IP de la URL
        const response = await axios.get(`https://ip.guide/${ip}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la IP", error: error.message });
    }
};

module.exports = { searchIP, getQueries, getIPDetails };
