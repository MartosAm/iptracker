const express = require("express");
const { searchIP, getQueries,getIPDetails  } = require("../controllers/ipController");
const authenticateToken = require("../middleware/auth");
const ipSearchLimiter = require("../middleware/rateLimit");


const router = express.Router();

// Rutas protegidas por JWT
router.get("/search/ip/:ip", authenticateToken, searchIP, getIPDetails);
router.get("/history", authenticateToken, getQueries);

module.exports = router;







