--------- BODY PARTS ------------------

-- Query to SELECT all body parts
SELECT * FROM BodyParts;

--  INSERT a new body part
INSERT INTO BodyParts (Name, isUpper)
VALUES (:bodyPartNameInput, :isUpperInput);

-- UPDATE a body part
UPDATE BodyParts 
SET Name = :bodyPartNameInput, isUpper = :isUpperInput
WHERE BodyPartID = :bodyPartIdInput;

--DELETE a body part 
DELETE FROM BodyParts
WHERE ID = :bodyPartIdInput;



------- EXERCISE--------

-- Query to SELECT all exercises
SELECT * FROM Exercises;

-- INSERT a new exercise
INSERT INTO Exercises (Name, Description)
VALUES (:exerciseNameInput, :descriptionInput);

-- INSERT an exercise to a body part
INSERT INTO ExerciseBodyParts (ExerciseID, BodyPartID)
VALUES (:exerciseIdInput, :bodyPartIdInput);


-- UPDATE an exercise
UPDATE Exercises
SET Name = :exerciseNameInput, Description = :descriptionInput, BodyPartId = :bodyPartIdInput
WHERE exerciseID = :exerciseIdInput;

-- DELETE an exercise 
DELETE FROM Exercises
WHERE exerciseID = :exerciseIdInput;

-------- WORKOUTS------------

--  SELECT all workouts
SELECT * FROM Workouts;

-- INSERT a new workout
INSERT INTO Workouts (Name, Description)
VALUES (:workoutNameInput, :descriptionInput);

-- Query to UPDATE a workout by its ID

UPDATE Workouts
SET Name = :workoutNameInput, Description = :descriptionInput
WHERE WorkoutID = :workoutIdInput;

-- Query to DELETE a workout by its ID
DELETE FROM Workouts
WHERE WorkoutID = :workoutIdInput;

----------USER----------

--SELECT all users
SELECT * FROM Users

--INSERT new user
INSERT INTO Users (UserID, Email, Username,Password)
VALUES (:userIdInput, :emailInput, :usernameInput,:passwordInput);

--UPDATE user
UPDATE  Users
SET  UserID = :userIdInput, Email = :emailInput,Username = :usernameInput,Password = :passwordInput
WHERE UserID = :userIdInput

-------WORKOUT EXERCISES------------

-- INSERT a new workout Exercise
INSERT INTO WorkoutExercises (WorkoutID, ExerciseID, Sets, Reps, Intensity)
VALUES (:workoutIdInput, :exerciseIdInput, :setsInput, :repsInput, :intensityInput);

-- UPDATE workout Exercise
UPDATE WorkoutExercises
SET Sets = :setsInput, Reps = :repsInput, Intensity = :intensityInput
WHERE ID = :workoutExerciseIdInput;

-- DELETE workout Exercise
DELETE FROM WorkoutExercises
WHERE ID = :workoutExerciseIdInput;

-----USER WORKOUTS-------

-- INSERT new user workout
INSERT INTO UsersWorkouts (UserID, WorkoutID)
VALUES (:userIdInput, :workoutIdInput);

-- DELETE user workout
DELETE FROM UsersWorkouts
WHERE ID = :userWorkoutIdInput;


-------EXERCISE BODY PARTS------

-- INSERT exercise body part
INSERT INTO ExerciseBodyParts (BodyPartID, ExerciseID)
VALUES (:bodyPartIdInput, :exerciseIdInput);

-- DELETE exercise body part
DELETE FROM ExerciseBodyParts
WHERE ID = :exerciseBodyPartIdInput;





