require("dotenv").config();
const pool = require("./config/db");   // <- यहाँ import करो

const express = require("express");
const userRouter = require("./routes/userRouter");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const imgRoutes = require("./routes/imgRoutes");
const auth = require("./middlewares/auth");

const app = express();

app.use(express.json());

app.use("/api", userRouter);
app.use("/api",categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", imgRoutes);

app.get("/api/test-db", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()"); // DB server time fetch
    res.json({ success: true, dbTime: rows[0].now });
  } catch (err) {
    console.error("DB connection error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
