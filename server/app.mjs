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
  const { Username,Email,Password } = req.body;
  const insertUserQuery = "INSERT INTO Users (Username,Email,Password) VALUES (?, ?, ?)";
  db.query(insertUserQuery, [Username,Email,Password ], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new user');
      return;
    }
    res.status(201).json({ message: "user created successfully", UserID: result.insertId });
  });
});


app.post('/ExerciseBodyPart', (req, res) => {
  const { ExerciseID,BodyPartID} = req.body;
  const insertExerciseBodyPartQuery = "INSERT INTO ExerciseBodyPart (ExerciseID,BodyPartID) VALUES (?, ?)";
  db.query(insertExerciseBodyPartQuery, [ExerciseID,BodyPartID ], (err, result) => {
    if (err) {
      res.status(500).send('Error adding new exercise body part');
      return;
    }
    res.status(201).json({ message: "exercise body part created successfully", exerciseID: result.insertId });
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
  const { UserID, Username, Email, Password} = req.body
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
  const {ID,ExerciseID,BodyPartID } = req.body
  const updateExerciseBodyPartQuery = "UPDATE ExerciseBodyPart SET ExerciseID = ?, BodyPartID = ? WHERE ID = ?";
  db.query(updateExerciseBodyPartQuery, [ExerciseID,BodyPartID,ID], (err, result) => {
    if (err) {
      res.status(500).send('Error updating Exercise body part');
      return;
    }
    res.json({ message: "Exercise body part updated successfully" });
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
// Catch all other routes and return the index.html file from React app
// app.get('*', (req, res) => {
//   res.sendFile('/nfs/stak/users/belingam/CS340/project/build/index.html');
// });

const PORT = 9007;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
