// const express = require('express');
// const path = require('path');
// const mysql = require('mysql');
import path from 'path';
import mysql from 'mysql';
import express from 'express'
const app = express();
import 'dotenv/config.js'

// app.js - SETUP section
const PASS = process.env.PASS
const USER = process.env.USER

const db = mysql.createConnection({
  host: 'classmysql.engr.oregonstate.edu',
  user: 'cs340_belingam',
  password: '5282',
  database: 'cs340_belingam'
});
// Serve static files from the React app
app.use(express.static('../build'));
// app.use(express.json())

app.use(express.json());

app.get('/Exercise', (req, res) => {
  const searchTerm = req.query.search || '';
  const query = "SELECT * FROM Exercises WHERE Name LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, exercises) => {
    if (err) {
      console.error('Error fetching exercises', err);
      res.status(500).send('Error fetching exercises');
      return;
    }

    res.json(exercises);
  });
});

app.post('/Exercise', (req, res) => {
  const { Name, Description } = req.body;
  const insertExerciseQuery = "INSERT INTO Exercises (Name, Description) VALUES (?, ?)";
  db.query(insertExerciseQuery, [Name, Description], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new exercise');
      return;
    }
    res.status(201).json({ message: "Exercise created successfully", exerciseID: result.insertId });
  });
});

app.put('/Exercise', (req, res) => {
  const { ExerciseID, Name, Description } = req.body
  const updateExerciseQuery = "UPDATE Exercises SET Name = ?, Description = ? WHERE ExerciseID = ?";
  db.query(updateExerciseQuery, [Name, Description, ExerciseID], (err, result) => {
    if (err) {
      res.status(500).send('Error updating exercise');
      return;
    }
    res.json({ message: "Exercise updated successfully" });
  });
});

app.delete('/Exercise', (req, res) => {
  const { ExerciseID } = req.body;
  const deleteQuery = "DELETE FROM Exercises WHERE ExerciseID = ?";
  db.query(deleteQuery, [ExerciseID], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting exercise');
      return;
    }
    res.json({ message: "Exercise deleted successfully" });
  });
});

// Catch all other routes and return the index.html file from React app
// app.get('*', (req, res) => {
//   res.sendFile('/nfs/stak/users/belingam/CS340/project/build/index.html');
// });

const PORT = 8999;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
