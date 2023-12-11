-- Disable foreign key checks and set autocommit to off for batch operations
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop tables if they exist to allow fresh creation
DROP TABLE IF EXISTS WorkoutExercises;
DROP TABLE IF EXISTS ExerciseBodyParts;
DROP TABLE IF EXISTS Exercises;
DROP TABLE IF EXISTS BodyParts;
DROP TABLE IF EXISTS UsersWorkouts;
DROP TABLE IF EXISTS Workouts;
DROP TABLE IF EXISTS Users;

-- Create Users table with unique email and username
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL
);

-- Create Workouts table
CREATE TABLE Workouts (
    WorkoutID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    Description VARCHAR(255) NOT NULL
);

-- Create a junction table for Users and Workouts (many-to-many relationship)
CREATE TABLE UsersWorkouts (
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    WorkoutID INT NOT NULL,
    UserID INT NOT NULL,
    FOREIGN KEY (WorkoutID) REFERENCES Workouts(WorkoutID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create BodyParts table with a flag for upper body
CREATE TABLE BodyParts (
    BodyPartID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    IsUpperBody INT CHECK (IsUpperBody IN (0, 1))
);

-- Create Exercises table
CREATE TABLE Exercises (
    ExerciseID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) UNIQUE NOT NULL,
    Description VARCHAR(255) NOT NULL
);

-- Create a table to link Workouts with Exercises (many-to-many relationship)
CREATE TABLE WorkoutExercises (
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Sets INT NOT NULL,
    Reps INT NOT NULL,
    Intensity DECIMAL(2,2) NOT NULL,
    WorkoutID INT NOT NULL,
    ExerciseID INT NOT NULL,
    FOREIGN KEY (WorkoutID) REFERENCES Workouts(WorkoutID) ON DELETE CASCADE,
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID) ON DELETE CASCADE
);

-- Create a table to link Exercises with BodyParts (many-to-many relationship)
CREATE TABLE ExerciseBodyParts (
    ID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    BodyPartID INT,
    ExerciseID INT NOT NULL,
    FOREIGN KEY (BodyPartID) REFERENCES BodyParts(BodyPartID) ON DELETE CASCADE,
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID) ON DELETE CASCADE
);

-- Insert sample data into Users
INSERT INTO Users (Email, Username, Password) VALUES ...

-- Insert sample data into BodyParts
INSERT INTO BodyParts (Name, IsUpperBody) VALUES ...

-- Insert sample data into Exercises
INSERT INTO Exercises ( Name, Description) VALUES ...

-- Insert sample data into Workouts
INSERT INTO Workouts (Name, Description) VALUES ...

-- Insert sample data into UsersWorkouts
INSERT INTO UsersWorkouts (WorkoutID, UserID) VALUES ...

-- Insert sample data into WorkoutExercises
INSERT INTO WorkoutExercises (WorkoutID, ExerciseID, Sets, Reps, Intensity) VALUES ...

-- Re-enable foreign key checks and commit the transactions
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

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

INSERT INTO ExerciseBodyParts ( BodyPartID, ExerciseID) VALUES
(1, 1),
(2, 2);

INSERT INTO WorkoutExercises (WorkoutID, ExerciseID, Sets, Reps, Intensity) VALUES
(1, 1, 3, 10, 0.75),
(2, 2, 3, 10, 0.5),
(2, 2, 3, 8, 0.80);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;