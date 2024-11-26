const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const {app, server} = require("./socket/index");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

connectDB();
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
