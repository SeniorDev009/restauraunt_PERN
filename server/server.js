require("dotenv").config();
const express = require("express");
const db = require('./db')
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3002;

// middleware
app.use(morgan("tiny"));

// second middleware
app.use((req, res, next) => {
    console.log("this is our second middleware");
    next();
})

app.use(express.json());

// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            }
        })
    } catch (err) {
        console.log(err);
    }
})

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    
    try {
        const result = await db.query("select * from restaurants where id=$1", [req.params.id]);
        
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
    
})

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body)
    try {
        
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
    
})

// Update Restaurants
app.put("/api/v1/restaurants/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body)
    res.status(404).json({
        status: "success",
        data: {
            restaurant: "mcdonalds"
        }
    })
})

// Delete a Restaurant
app.delete("/api/v1/restaurant/:id", (req, res) => {
    res.status(204).json({
        status: "success",
    });
})
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
})