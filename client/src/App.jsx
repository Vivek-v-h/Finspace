import {BrowserRouter,Routes,Route  } from 'react-router-dom'
import {React} from "react";
import About from "./pages/About.jsx"
import Home from './pages/Home.jsx';
import Signin from "./pages/Signin.jsx";
import Profile from "./pages/Profile.jsx";
import Signup from './pages/Signup.jsx';
import AnalyticalPage from './pages/Analytics.jsx';

import './App.css'
import PrivateRoute from './components/PrivateRoute.jsx';
import BudgetPage from './pages/budgetpage.jsx';

function App() {

  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}></Route>
        <Route path="/sign-in" element={<Signin/>}></Route>
        <Route path="/sign-up" element={<Signup/>}></Route>
        <Route path="/Analytics" element={<AnalyticalPage/>}></Route>
        <Route path="/Budget" element={<BudgetPage/>}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
