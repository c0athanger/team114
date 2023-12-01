import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Users from './components/Users'
import Exercises from './components/Exercises';
import Workouts from './components/Workouts';
import Bodyparts from './components/Bodyparts';
import Table from './components/Table';
import axios from 'axios'

const App = () => {

  const ALLTABLES = ['Exercises', 'BodyParts', 'Workouts']
  const [all_attr, setAttr] = useState({});

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
  }

  useEffect(async () => {
    await make_attributes();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Exercises" element={<Table attr={all_attr['Exercises']} rt="/Exercise" name="Exercise" />} />
        <Route path="/Bodyparts" element={<Table attr={all_attr['BodyParts']} rt="/BodyPart" name="Bodypart" />} />
        <Route path="/Workouts" element={<Table attr={all_attr['Workouts']} rt="/Workout" name="Workout" />} />
        <Route path="/Users" element={<Table attr={all_attr['Users']} rt="/User" name="User" />} />
      </Route>
    </Routes>
  );
}

export default App;
