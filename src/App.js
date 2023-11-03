import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Users from './components/Users'
import Exercises from './components/Exercises';
import Workouts from './components/Workouts';
import Bodyparts from './components/Bodyparts';

const App = () => {
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
