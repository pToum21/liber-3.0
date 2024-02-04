// importing this allows other page components to be injected into the Outlet component.
import { Outlet } from 'react-router-dom';
// components used in App.jsx (and will carry over to other pages, because this is default component in main.jsx)
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
