import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Table from './components/Table';
import JunctionTable from './components/JunctionTable'
import axios from 'axios'
import { BlocksWave } from "react-svg-spinners"

// Date: 12/30/2022  
// Routing and navbar loosely based off this react navbar tutorial
// Source URL: https://github.com/tech2etc/React-Navbar-Advance

///////////////////////////////////////////////
// App component
///////////////////////////////////////////////
const App = () => {

  // define state vars

  // Names of all backend tables
  const ALLTABLES = ['Exercises', 'BodyParts', 'Workouts', 'Users', 'UsersWorkouts', 'WorkoutExercises', 'ExerciseBodyParts']

  // Array of string of names of all table attributes
  const [all_attr, setAttr] = useState({});

  // load conditional for rendering load spinner
  const [isLoad, setLoad] = useState(false);

  // get request for table attributes
  const get_attr_request = async (table_name) => {
    const response = await axios.get(`/Attribute?search=${table_name}`);
    return response.data
  }

  // function for populating all_attr state var
  const make_attributes = async () => {
    let temp = {};
    for (let table of ALLTABLES) {
      temp[table] = await get_attr_request(table);
    }

    setAttr(temp);
    setLoad(true)
  }

  // initial render function call to make_attributes_function
  useEffect(async () => {
    await make_attributes();
  }, [])

  // conditional rendering of routing or load spinner of all attribute
  // requests have not finished being processed
  return (
    <>
      {isLoad
        ? <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/Exercises" element={<Table attr={all_attr['Exercises']} rt="/Exercise" name="Exercise" />} />
            <Route path="/Bodyparts" element={<Table attr={all_attr['BodyParts']} rt="/BodyPart" name="Bodypart" />} />
            <Route path="/Workouts" element={<Table attr={all_attr['Workouts']} rt="/Workout" name="Workout" />} />
            <Route path="/Users" element={<Table attr={all_attr['Users']} rt="/User" name="User" />} />
            <Route path="/UsersWorkouts" element={<JunctionTable attr={all_attr['UsersWorkouts']} rt="/UsersWorkout" name="UsersWorkout" />} />
            <Route path="/WorkoutExercises" element={<JunctionTable attr={all_attr['WorkoutExercises']} rt="/WorkoutExercise" name="WorkoutExercise" />} />
            <Route path="/ExerciseBodyParts" element={<JunctionTable attr={all_attr['ExerciseBodyParts']} rt="/ExerciseBodyPart" name="ExerciseBodyPart" />} />
          </Route>
        </Routes>
        :
        <main>
          <div className="centermeinside">
            <BlocksWave width={100} height={100} color={"orange"} />
          </div>
        </main>
      }
    </>
  );
}

export default App;
