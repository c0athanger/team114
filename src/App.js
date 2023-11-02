import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import User from './components/User'
import Exercises from './components/Exercises';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/Exercises" element={<Exercises />} />
      </Route>
    </Routes>
  );
}

export default App;
