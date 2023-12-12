// Citation for the following function: mysql.createConnection
// Date: 12/10/2023
// Based on the guide provided in activity 2
// reused the function but added my information.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%205%20-%20Adding%20New%20Data/README.md



//Citation for the following:  app.get,app.post,app.put,app.delete 
//Date: 12/10/2023  
//Based on  a youtube tutorial on node.js/express/mySQL
//Used for receiving data from the front end.
//Source URL: [https://github.com/osu-cs340-ecampus/nodejs-starter-app/blob/main/Step%205%20-%20Adding%20New%20Data/README.md  ](https://www.youtube.com/watch?v=fPuLnzSjPLE&ab_channel=LamaDev)https://www.youtube.com/watch?v=fPuLnzSjPLE&ab_channel=LamaDev

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

// This routes handles get requests for table attributes.
// It retrieves a array of attributes for a specific table
// specified by the search term.
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
// This route handles GET requests for '/Exercise'.
// It retrieves a list of exercises from the database.
// An optional 'search' query parameter can be used to filter exercises by their names.
// If a 'search' term is provided, it returns exercises that contain this term in their names.
// If no search term is provided, it returns all exercises.
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
// This route handles GET requests for '/Workout'.
// It retrieves a list of workouts from the database.
// An optional 'search' query parameter can be used to filter workouts by their names.
// If a 'search' term is provided, it returns workouts that contain the term in their names.
// If no search term is provided, it returns all workouts.
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
// This route handles GET requests for '/User'.
// It retrieves a list of users from the database.
// An optional 'search' query parameter can be used to filter users by their usernames.
// If a 'search' term is provided, it returns users that contain this term in their usernames.
// If no search term is provided, it returns all users.
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
// This route handles GET requests for '/UsersWorkout'.
// It retrieves a list of user workouts from the database.
// An optional 'search' query parameter can be used to filter by the ID.
// If a 'search' term is provided, it returns user workouts that contain this term in their ID.
// If no search term is provided, it returns all user workouts.
app.get('/UsersWorkout', (req, res) => {
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
// This route handles GET requests for '/ExerciseBodyPart'.
// It retrieves a list of exercise-body part associations from the database.
// An optional 'search' query parameter can be used to filter by the ID.
// If a 'search' term is provided, it returns associations that contain this term in their ID.
// If no search term is provided, it returns all associations.
app.get('/ExerciseBodyPart', (req, res) => {
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
// This route handles GET requests for '/WorkoutExercise'.
// It retrieves a list of workout exercises from the database.
// An optional 'search' query parameter can be used to filter by the ID.
// If a 'search' term is provided, it returns workout exercises that contain this term in their ID.
// If no search term is provided, it returns all workout exercises.
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
// This route handles POST requests for '/Exercise'.
// It adds a new exercise to the database.
// The request body must contain 'Name' and 'Description' of the exercise.
// If the exercise is added successfully, it returns a confirmation message with the new exercise's ID.
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
// This route handles POST requests for '/Workout'.
// It adds a new workout to the database.
// The request body must contain the 'Name' and 'Description' of the workout.
// On successful addition, it sends back a confirmation message with the new workout's ID.
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
// This route handles POST requests for '/User'.
// It adds a new user to the database.
// The request body must contain 'Username', 'Email', and 'Password' of the user.
// On successful addition, it returns a confirmation message with the new user's ID.
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

// This route handles POST requests for '/ExerciseBodyPart'.
// It creates a new association between an exercise and a body part in the database.
// The request body must contain 'ExerciseID' and 'BodyPartID'.
// On successful addition, it sends back a confirmation message with the new association's ID.
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
// This route handles POST requests for '/UsersWorkout'.
// It adds a new user workout association to the database.
// The request body must include 'UserID' and 'WorkoutID'.
// On successful addition, it returns a confirmation message with the new association's ID.
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
// This route handles POST requests for '/WorkoutExercise'.
// It adds a new workout exercise to the database.
// The request body must include 'WorkoutID', 'ExerciseID', 'Sets', 'Reps', and 'Intensity'.
// On successful addition, it sends back a confirmation message with the new workout exercise's ID.
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
// This route handles PUT requests for '/Exercise'.
// It updates an existing exercise in the database.
// The request body must include 'ExerciseID', and new values for 'Name' and 'Description'.
// It sends back a confirmation message if the update is successful.
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

// This route handles PUT requests for '/Workout'.
// It updates an existing workout in the database.
// The request body must include 'WorkoutID', and new values for 'Name' and 'Description'.
// It sends back a confirmation message if the update is successful.
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

// This route handles PUT requests for '/User'.
// It updates an existing user in the database.
// The request body must include 'UserID', and new values for 'Username', 'Email', and 'Password'.
// It sends back a confirmation message if the update is successful.
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
// This route handles PUT requests for '/ExerciseBodyPart'.
// It updates an existing association between an exercise and a body part in the database.
// The request body must include 'ID', 'ExerciseID', and 'BodyPartID'.
// It sends back a confirmation message if the update is successful.
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

// This route handles PUT requests for '/UsersWorkout'.
// It updates an existing user workout association in the database.
// The request body must include 'ID', 'UserID', and 'WorkoutID'.
// It sends back a confirmation message if the update is successful.
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
// This route handles PUT requests for '/WorkoutExercise'.
// It updates an existing workout exercise in the database.
// The request body must include 'ID', 'Sets', 'Reps', and 'Intensity'.
// It sends back a confirmation message if the update is successful.
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
  const updateJunctionQuery = "UPDATE ExerciseBodyParts SET BodyPartID = NULL WHERE BodyPartID = ?";
  db.query(updateJunctionQuery, [BodyPartID], (err, result) => {
    if (err) {
      res.status(500).send('Error setting BodyPartID to NULL in ExerciseBodyParts');
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
// This route handles DELETE requests for '/Exercise'.
// It deletes an existing exercise from the database.
// The request body must include 'ExerciseID'.
// Before deletion, it also removes associated data from the 'ExerciseBodyParts' junction table.
// It returns a confirmation message when the deletion is successful.
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
// This route handles DELETE requests for '/Workout'.
// It deletes an existing workout from the database.
// The request body must include 'WorkoutID'.
// Before delete from the parent table, it also removes associated data from the 'UsersWorkouts' junction table.
// It returns a confirmation message when the deletion is successful.
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
// This route handles DELETE requests for '/User'.
// It deletes an existing user from the database.
// The request body must include 'UserID'.
// Before deletion, it also removes associated data from the 'UsersWorkouts' junction table.
// It returns a confirmation message when the deletion is successful.
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
// This route handles DELETE requests for '/ExerciseBodyPart'.
// It deletes an existing exercise-body part association from the database.
// The request body must include the 'ID' of the association to be deleted.
// It returns a confirmation message when the deletion is successful.
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
// This route handles DELETE requests for '/UsersWorkout'.
// It deletes an existing user workout association from the database.
// The request body must include the 'ID' of the association to be deleted.
// It returns a confirmation message when the deletion is successful.
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
// This route handles DELETE requests for '/WorkoutExercise'.
// It deletes an existing workout exercise from the database.
// The request body must include the 'ID' of the workout exercise to be deleted.
// It returns a confirmation message when the deletion is successful.
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
