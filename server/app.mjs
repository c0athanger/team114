// const express = require('express');
// const path = require('path');
// const mysql = require('mysql');


// Citation for the following function: mysql.createConnection
// Date: 12/10/2023
// Based on the guide provided in activity 2
// reused the function but added my information.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%205%20-%20Adding%20New%20Data/README.md

import path from 'path';
import mysql from 'mysql';
import express from 'express'
const app = express();
import 'dotenv/config.js'

// app.js - SETUP section
const PASS = process.env.PASS
const HOST = process.env.HOST
const PORT = process.env.PORT
const USERNAME = process.env.USERNAME
const DATABASE = process.env.DATABASE
const INDEX_PATH = process.env.INDEX_PATH

const db = mysql.createConnection({
  host: HOST,
  user: USERNAME,
  password: PASS,
  database: DATABASE
});

// Serve static files from the React app
app.use(express.static('../build'));
// app.use(express.json())

app.use(express.json());


app.get('/Attribute', (req, res) => {
  const searchTerm = req.query.search;
  const query = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'${searchTerm}'`
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching attributes', err);
      res.status(500).send('Error fetching attributes')
      return
    }
    let temp = [];
    for (let attr of result) {
      temp.push(attr['COLUMN_NAME'])
    }
    res.json(temp)
  })
})


// This route handles GET requests for '/BodyPart'. 
// It retrieves a list of body parts from the database. 
// An optional 'search' query parameter can be used to filter body parts by their names.
// If a 'search' term is provided, it returns body parts that contain this term in their names.
// If no search term is provided, it returns all of them
// Note: Detailed comments are only provided for the initial route handlers as the logic is 
// the same for all other GET requests
app.get('/BodyPart', (req, res) => {
  const searchTerm = req.query.search || '';
  const query = "SELECT * FROM BodyParts WHERE Name LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, bodyParts) => {
    if (err) {
      console.error('Error fetching Body Parts', err);
      res.status(500).send('Error fetching Body Parts');
      return;
    }

    res.json(bodyParts);
  });
});

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
app.get('/Workout', (req, res) => {
  const searchTerm = req.query.search || '';
  const query = "SELECT * FROM Workouts WHERE Name LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, workouts) => {
    if (err) {
      console.error('Error fetching Workouts', err);
      res.status(500).send('Error fetching Workouts');
      return;
    }

    res.json(workouts);
  });
});

app.get('/User', (req, res) => {
  const searchTerm = req.query.search || '';
  const query = "SELECT * FROM Users WHERE Username LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, users) => {
    if (err) {
      console.error('Error fetching users', err);
      res.status(500).send('Error fetching users');
      return;
    }

    res.json(users);
  });
});

app.get('/UsersWorkout', (req, res) => {
  console.log("GET usersworkouts");
  const searchTerm = req.query.search || '';
  const query = "SELECT * FROM UsersWorkouts WHERE ID LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, users) => {
    if (err) {
      console.error('Error fetching users workout', err);
      res.status(500).send('Error fetching user workout');
      return;
    }

    res.json(users);
  });
});

app.get('/ExerciseBodyPart', (req, res) => {
  console.log("GET ExerciseBodyPart");
  const searchTerm = req.query.search || '';
  const query = "SELECT * FROM ExerciseBodyParts WHERE ID LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, users) => {
    if (err) {
      console.error('Error fetching ExerciseBodyPart', err);
      res.status(500).send('Error fetching ExerciseBodyPart');
      return;
    }
    res.json(users);
  });
});

app.get('/WorkoutExercise', (req, res) => {
  const searchTerm = req.query.search || '';
  const query = "SELECT * FROM WorkoutExercises WHERE ID LIKE ?";
  db.query(query, [`%${searchTerm}%`], (err, users) => {
    if (err) {
      console.error('Error fetching workout exercises', err);
      res.status(500).send('Error fetching workout exercises');
      return;
    }
    res.json(users);
  });
});

// This route handles POST requests to '/BodyPart'.
// It adds a new body part to the database.
// The request body must contain the 'Name' and 'IsUpperBody' fields.
// 'Name' represents the name of the body part, and 'IsUpperBody' indicates if it is an upper body part.
// If added succesfully, it sends back a confirmation message along with the ID of the new body part.

app.post('/BodyPart', (req, res) => {
  const { Name, IsUpperBody } = req.body;
  //const isUpperInt = parseInt(isUpper, 10);
  const insertBodyPartQuery = "INSERT INTO BodyParts (Name, IsUpperBody) VALUES (?, ?)";
  db.query(insertBodyPartQuery, [Name, IsUpperBody], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new body part');
      return;
    }
    res.status(201).json({ message: "Body part created successfully", bodyPartID: result.insertId });
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

app.post('/Workout', (req, res) => {
  const { Name, Description } = req.body;
  const insertWorkoutQuery = "INSERT INTO Workouts (Name, Description) VALUES (?, ?)";
  db.query(insertWorkoutQuery, [Name, Description], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new Workout');
      return;
    }
    res.status(201).json({ message: "workout created successfully", WorkoutID: result.insertId });
  });
});

app.post('/User', (req, res) => {
  const { Username, Email, Password } = req.body;
  const insertUserQuery = "INSERT INTO Users (Username,Email,Password) VALUES (?, ?, ?)";
  db.query(insertUserQuery, [Username, Email, Password], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new user');
      return;
    }
    res.status(201).json({ message: "user created successfully", UserID: result.insertId });
  });
});


app.post('/ExerciseBodyPart', (req, res) => {
  const { ExerciseID, BodyPartID } = req.body;
  // The if statement below checks if the bodypartID received is null
  let bodyPartIdValue
  if (BodyPartID === 'null' || BodyPartID === null) {
    bodyPartIdValue = null;
  } else {
    bodyPartIdValue = BodyPartID;
  }
  const insertExerciseBodyPartQuery = "INSERT INTO ExerciseBodyParts (ExerciseID,BodyPartID) VALUES (?, ?)";
  db.query(insertExerciseBodyPartQuery, [ExerciseID, bodyPartIdValue], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new exercise body part');
      return;
    }
    res.status(201).json({ message: "exercise body part created successfully", exerciseID: result.insertId });
  });
});
app.post('/UsersWorkout', (req, res) => {
  const { UserID, WorkoutID } = req.body;
  const insertUserWorkoutQuery = "INSERT INTO UsersWorkouts (UserID, WorkoutID) VALUES (?, ?)";
  db.query(insertUserWorkoutQuery, [UserID, WorkoutID], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new user workout');
      return;
    }
    res.status(201).json({ message: "User workout created successfully", userWorkoutID: result.insertId });
  });
});

app.post('/WorkoutExercise', (req, res) => {
  const { WorkoutID, ExerciseID, Sets, Reps, Intensity } = req.body;
  const insertQuery = "INSERT INTO WorkoutExercises (WorkoutID, ExerciseID, Sets, Reps, Intensity) VALUES (?, ?, ?, ?, ?)";
  db.query(insertQuery, [WorkoutID, ExerciseID, Sets, Reps, Intensity], (err, result) => {
    if (err) {
      console.error('Error adding workout exercise', err);
      res.status(500).send('Error adding workout exercise');
      return;
    }
    res.status(201).json({ message: "Workout exercise added successfully", workoutExerciseID: result.insertId });
  });
});


// This route handles PUT requests to '/BodyPart'.
// It updates the values of an existing body part in the database.
// The request body should include 'BodyPartID' to select the right body part, 
// and the new 'Name' and 'IsUpperBody' values for the update.
// The route updates the specified body part and sends a message if done succesfully.

app.put('/BodyPart', (req, res) => {
  const { BodyPartID, Name, IsUpperBody } = req.body
  const updateBodyPartQuery = "UPDATE BodyParts SET Name = ?, IsUpperBody = ? WHERE BodyPartID = ?";
  db.query(updateBodyPartQuery, [Name, IsUpperBody, BodyPartID], (err, result) => {
    if (err) {
      res.status(500).send('Error updating Body Part');
      return;
    }
    res.json({ message: "Body part updated successfully" });
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


app.put('/Workout', (req, res) => {
  const { WorkoutID, Name, Description } = req.body
  const updateExerciseQuery = "UPDATE Workouts SET Name = ?, Description = ? WHERE WorkoutID = ?";
  db.query(updateExerciseQuery, [Name, Description, WorkoutID], (err, result) => {
    if (err) {
      res.status(500).send('Error updating workout');
      return;
    }
    res.json({ message: "workout updated successfully" });
  });
});


app.put('/User', (req, res) => {
  const { UserID, Username, Email, Password } = req.body
  const updateUserQuery = "UPDATE Users SET Username = ?, Email = ?, Password = ? WHERE UserID = ?";
  db.query(updateUserQuery, [Username, Email, Password, UserID], (err, result) => {
    if (err) {
      res.status(500).send('Error updating User');
      return;
    }
    res.json({ message: "User updated successfully" });
  });
});

app.put('/ExerciseBodyPart', (req, res) => {
  const { ID, ExerciseID, BodyPartID } = req.body
  let bodyPartIdValue
  if (BodyPartID === 'null' || BodyPartID === null) {
    bodyPartIdValue = null;
  } else {
    bodyPartIdValue = BodyPartID;
  }
  const updateExerciseBodyPartQuery = "UPDATE ExerciseBodyParts SET ExerciseID = ?, BodyPartID = ? WHERE ID = ?";
  db.query(updateExerciseBodyPartQuery, [ExerciseID, bodyPartIdValue, ID], (err, result) => {
    if (err) {
      res.status(500).send('Error updating Exercise body part');
      return;
    }
    res.json({ message: "Exercise body part updated successfully" });
  });
});
app.put('/UsersWorkout', (req, res) => {
  const { ID, UserID, WorkoutID } = req.body;
  const updateQuery = "UPDATE UsersWorkouts SET UserID = ?, WorkoutID = ? WHERE ID = ?";
  db.query(updateQuery, [UserID, WorkoutID, ID], (err, result) => {
    if (err) {
      console.error('Error updating user workout', err);
      res.status(500).send('Error updating user workout');
      return;
    }
    res.json({ message: "User workout updated successfully" });
  });
});

app.put('/WorkoutExercise', (req, res) => {
  const { ID, Sets, Reps, Intensity } = req.body;
  const updateQuery = "UPDATE WorkoutExercises SET Sets = ?, Reps = ?, Intensity = ? WHERE ID = ?";
  db.query(updateQuery, [Sets, Reps, Intensity, ID], (err, result) => {
    if (err) {
      console.error('Error updating workout exercise', err);
      res.status(500).send('Error updating workout exercise');
      return;
    }
    res.json({ message: "Workout exercise updated successfully" });
  });
});

// This route handles DELETE requests to '/BodyPart'.
// After receiving the bodypartID it deletes data linked to that ID from the junction table 'ExerciseBodyParts'
// It then removes the body part from the database.
// The request body must include the 'BodyPartID' of the body part to be deleted.
// It returns a confirmation message when deleted.
app.delete('/BodyPart', (req, res) => {
  const { BodyPartID } = req.body;
  const deleteJunctionQuery = "DELETE FROM ExerciseBodyParts WHERE BodyPartID = ?";
  db.query(deleteJunctionQuery, [BodyPartID], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting associated exercise in ExerciseBodyParts');
      return;
    }
    const deleteQuery = "DELETE FROM BodyParts WHERE BodyPartID = ?";
    db.query(deleteQuery, [BodyPartID], (err, result) => {
      if (err) {
        res.status(500).send('Error deleting Body part');
        return;
      }
      res.json({ message: "Body part  deleted successfully" });
    });
  });
});

app.delete('/Exercise', (req, res) => {
  const { ExerciseID } = req.body;
  const deleteJunctionQuery = "DELETE FROM ExerciseBodyParts WHERE ExerciseID = ?";
  db.query(deleteJunctionQuery, [ExerciseID], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting associated exercise in ExerciseBodyParts');
      return;
    }
    const deleteQuery = "DELETE FROM Exercises WHERE ExerciseID = ?";
    db.query(deleteQuery, [ExerciseID], (err, result) => {
      if (err) {
        res.status(500).send('Error deleting exercise');
        return;
      }
      res.json({ message: "Exercise deleted successfully" });
    });
  });
});

app.delete('/Workout', (req, res) => {
  const { WorkoutID } = req.body;
  const deleteJunctionQuery = "DELETE FROM UsersWorkouts WHERE WorkoutID = ?";
  db.query(deleteJunctionQuery, [WorkoutID], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting associated workout in UsersWorkouts');
      return;
    }
    const deleteQuery = "DELETE FROM Workouts WHERE WorkoutID = ?";
    db.query(deleteQuery, [WorkoutID], (err, result) => {
      if (err) {
        res.status(500).send('Error deleting workout');
        return;
      }
      res.json({ message: "workout deleted successfully" });
    });
  });
});

app.delete('/User', (req, res) => {
  const { UserID } = req.body;
  const deleteJunctionQuery = "DELETE FROM UsersWorkouts WHERE UserID = ?";
  db.query(deleteJunctionQuery, [UserID], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting associated workout in UsersWorkouts');
      return;
    }
    const deleteQuery = "DELETE FROM Users WHERE UserID = ?";
    db.query(deleteQuery, [UserID], (err, result) => {
      if (err) {
        res.status(500).send('Error deleting user');
        return;
      }
      res.json({ message: "user deleted successfully" });
    });
  });
});

app.delete('/ExerciseBodyPart', (req, res) => {
  const { ID } = req.body;
  const deleteQuery = "DELETE FROM ExerciseBodyParts WHERE ID = ?";
  db.query(deleteQuery, [ID], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting exercise body part');
      return;
    }
    res.json({ message: "exercise body part deleted successfully" });
  });
});

app.delete('/UsersWorkout', (req, res) => {
  const { ID } = req.body;
  const deleteUserWorkoutQuery = "DELETE FROM UsersWorkouts WHERE ID = ?";
  db.query(deleteUserWorkoutQuery, [ID], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting user workout');
      return;
    }
    res.json({ message: "User workout deleted successfully" });
  });
});

app.delete('/WorkoutExercise', (req, res) => {
  const { ID } = req.body;
  const deleteQuery = "DELETE FROM WorkoutExercises WHERE ID = ?";
  db.query(deleteQuery, [ID], (err, result) => {
    if (err) {
      console.error('Error deleting workout exercise', err);
      res.status(500).send('Error deleting workout exercise');
      return;
    }
    res.json({ message: "Workout exercise deleted successfully" });
  });
});

//Catch all other routes and return the index.html file from React app
app.get('*', (req, res) => {
  res.sendFile(INDEX_PATH);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
