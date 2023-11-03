import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
// import Users from './components/Uses'
import Exercises from './components/Exercises';
import Workouts from './components/Workouts';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Exercises" element={<Exercises />} />
        <Route path="/Workouts" element={<Workouts />} />
        {/* <Route path="/Users" element={<Users />} /> */}
        {/* <Route path="/Bodyparts" element={<Bodyparts />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
