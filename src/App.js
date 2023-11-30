import './App.css';
import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Users from './components/Users'
import Exercises from './components/Exercises';
import Workouts from './components/Workouts';
import Bodyparts from './components/Bodyparts';
import axios from 'axios'

const App = () => {

  const ALLBACKENDROUTES = ['/Exercise']
  const ALLTABLES = ['Exercises']
  const [attr_arr, setAttr] = useState([]);

  const get_attr_request = async (table_name) => {
    const response = await axios.get(`/Attribute?search=${table_name}`);
    console.log(response.data)
    console.log("done")
    return response.data
  }

  useEffect(() => {
    let temp = [];
    for (let table in ALLTABLES) {
      temp.push(get_attr_request(table));
    }
    setAttr(temp);
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Exercises" element={<Exercises />} />
        <Route path="/Workouts" element={<Workouts />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Bodyparts" element={<Bodyparts />} />
      </Route>
    </Routes>
  );
}

export default App;
