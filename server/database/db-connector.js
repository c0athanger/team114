// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')
import 'dotenv/config.js'

// app.js - SETUP section
const PASS = process.env.PASS
const HOST = process.env.HOST
const PORT = process.env.PORT
const USER = process.env.USER
const DATABASE = process.env.DATABASE

// Create a 'connection pool' using the provided credentials( update it with your information)
var pool = mysql.createPool({
    connectionLimit: 10,
    host: HOST,
    user: USER,
    password: PASS,
    database: DATABASE
})

// Export it for use in our applicaiton
module.exports.pool = pool;