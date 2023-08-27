require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
