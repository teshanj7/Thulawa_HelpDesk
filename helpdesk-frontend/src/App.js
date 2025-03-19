import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect} from "react";
import UserContext from "../src/ContextComponent/ContextComponent";

// Header and Footer
import Header from './componets/HeaderComponent/headerComponent';
import Footer from './componets/FooterComponent/footerComponent';

import Index from './pages/IndexPage/indexPage';
import HomePage from './pages/HomePage/homePage';
import ProfilePage from './pages/ProfilePage/profilePage';
import CreateIssuePage from './pages/CreateIssuePage/createIssuePage';
import ViewIssuePage from './pages/viewIssuePage/viewIssuePage';

function App() {
    // user and token details pass
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(()=> {
      const storedToken = localStorage.getItem("token");
      return storedToken ? JSON.parse(storedToken) : null;
    });
    useEffect(() => {
      if (user && token) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }, [user, token]);

  return (
    <Router>
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <Header/>
        <Routes>
          <Route path='' element={<Index/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/profile/:id' element={<ProfilePage/>}/>
          <Route path='/create-issue' element={<CreateIssuePage/>}/>
          <Route path='/view-issue' element={<ViewIssuePage/>}/>
        </Routes>
      <Footer/>
    </UserContext.Provider>
  </Router>
  );
}
 
export default App;