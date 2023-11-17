
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
DROP TABLE IF EXISTS WorkoutExercises;
DROP TABLE IF EXISTS ExerciseBodyParts;
DROP TABLE IF EXISTS Exercises;
DROP TABLE IF EXISTS BodyParts;
DROP TABLE IF EXISTS UsersWorkouts;
DROP TABLE IF EXISTS Workouts;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);


CREATE TABLE Workouts (
    WorkoutID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    Description VARCHAR(255) NOT NULL
);


-- UserWorkouts table
CREATE TABLE UsersWorkouts (
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    WorkoutID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (WorkoutID) REFERENCES Workouts(WorkoutID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);


CREATE TABLE BodyParts (
    BodyPartID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    IsUpperBody INT CHECK (IsUpperBody IN (0, 1))
);


CREATE TABLE Exercises (
    ExerciseID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    Description VARCHAR(255) NOT NULL
);

-- WorkoutExercises table
CREATE TABLE WorkoutExercises (
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    WorkoutID INT NOT NULL,
    ExerciseID INT NOT NULL,
    Sets INT NOT NULL,
    Reps INT NOT NULL,
    Intensity DECIMAL(2,2) NOT NULL,
    FOREIGN KEY (WorkoutID) REFERENCES Workouts(WorkoutID) ON DELETE CASCADE,
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID) ON DELETE CASCADE
);



-- ExerciseBodyParts table (In case you want to extend to more complex relationships where an exercise can target multiple body parts)
CREATE TABLE ExerciseBodyParts (
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    BodyPartID INT,
    ExerciseID INT NOT NULL,
    FOREIGN KEY (BodyPartID) REFERENCES BodyParts(BodyPartID) ON DELETE CASCADE,
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID) ON DELETE CASCADE
);

-- Sample data insertion
INSERT INTO Users (Email, Username, Password) VALUES
('user1@email.com', 'user1', 'password1'),
('user2@email.com', 'user2', 'password2'),
('user3@email.com', 'user3', 'password3'),
('user4@email.com', 'user4', 'password4');

INSERT INTO BodyParts (Name, IsUpperBody) VALUES
('Biceps', 1),
('Shoulders', 1),
('Back', 1),
('Legs', 0);

INSERT INTO Exercises ( Name, Description) VALUES
('Bicep Curl', 'Curl weights using your biceps'),
('Bench Press', 'Push barbell while laying on bench'),
('Squat', 'Lower your body by bending your knees');

INSERT INTO Workouts (Name, Description) VALUES
('Upper Body Workout', 'Workout targeting the upper body'),
('Lower Body Workout', 'Workout targeting the lower body'),
('Full Body Workout', 'Workout targeting the entire body');

-- Assuming a user has subscribed to a workout or created a workout
INSERT INTO UsersWorkouts (WorkoutID, UserID) VALUES
(1, 1),
(2, 2);


INSERT INTO WorkoutExercises (WorkoutID, ExerciseID, Sets, Reps, Intensity) VALUES
(1, 1, 3, 10, 0.75),
(2, 2, 3, 10, 0.5),
(2, 2, 3, 8, 0.80);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;