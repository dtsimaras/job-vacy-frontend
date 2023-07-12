import './App.css';
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import { createApi } from './api';

function App() {
    const api = createApi();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/admindashboard' element={<AdminDashboard api={api}/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
