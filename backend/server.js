const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/areahub", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const userRoutes = require("./routes/userRoutes");
const placeRoutes = require("./routes/placeRoutes");

app.use("/api/users", userRoutes);
app.use("/api/places", placeRoutes);

// Server
app.listen(5000, () => console.log("Server running on port 5000"));