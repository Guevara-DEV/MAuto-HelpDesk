const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("HelpDesk API funcionando 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

const pool = require("./config/db");

app.get("/db-test", async (req, res) => {
  try {

    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);

  } catch (error) {

    console.error(error);
    res.status(500).send("Error conectando a DB");

  }
});

const ticketRoutes = require("./routes/tickets.routes");

app.use("/api/tickets", ticketRoutes);

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);