require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3002;

app.use((req, res) => {
    console.log("yeah our middleware");
    next();
})

// Get all Restaurants
app.get("/api/v1/restaurants", (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            restaurant:["mcdonalds", "wendys"],
        }
    })
})

// Get a Restaurant
app.get("api/v1/restaurants/:id", (req, res) => {
    res.status(404).json({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }
    })
})

// Create a Restaurant
app.post("api/v1/restaurants", (req, res) => {
    console.log(req);
})
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})