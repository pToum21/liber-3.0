import { Outlet } from 'react-router-dom';
// components used in App.jsx (and should carry over to other pages)
import Navbar from './Components/Navbar/Navbar';
// css
import './styles/main.css';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App;
