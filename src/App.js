import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Table from './components/Table';
import JunctionTable from './components/JunctionTable'
import axios from 'axios'
import { BlocksWave } from "react-svg-spinners"

const App = () => {

  const ALLTABLES = ['Exercises', 'BodyParts', 'Workouts', 'Users', 'UsersWorkouts', 'WorkoutExercises', 'ExerciseBodyParts']
  const [all_attr, setAttr] = useState({});
  const [isLoad, setLoad] = useState(false);

  const get_attr_request = async (table_name) => {
    const response = await axios.get(`/Attribute?search=${table_name}`);
    console.log(response.data)
    console.log("done")
    return response.data
  }

  const make_attributes = async () => {
    let temp = {};
    for (let table of ALLTABLES) {
      temp[table] = await get_attr_request(table);
      console.log("Attributes: ")
      console.log(temp);
    }

    setAttr(temp);
    setLoad(true)
  }

  useEffect(async () => {
    await make_attributes();
  }, [])

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
        <div className='centerme'>
          <BlocksWave width={100} height={100} color={"orange"} />
        </div>
      }
    </>
  );
}

export default App;
