require("dotenv").config();

const express = require("express");
const cors = require("cors");
const seedRoutes = require("./routes/seedRoutes");
const teamRoutes = require("./routes/teamRoutes");
const userRoutes = require("./routes/userRoutes");
const disputeRoutes = require("./routes/disputeRoutes");
const commentRoutes = require("./routes/commentRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/seed", seedRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api/disputes", disputeRoutes);
app.use("/api/disputes", commentRoutes);
app.use("/api/invoices", invoiceRoutes);
app.get("/", (req, res) => {
  res.send("Dispute Management API Running");
});
app.get("/checkdb", async (req, res) => {
  res.json({
    dbName: require("mongoose").connection.name,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});