const express = require("express");
const cors = require("cors");
require("dotenv").config();
const paymentRoutes = require("./paymentRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));