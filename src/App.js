import React from "react";
import './App.css';
import NavbarApp from "./components/Navbar";
import Home from './pages/Home';
// import About from './pages/About';
import Favourites from "./pages/Favourites";
import CampsiteInfo from './pages/CampsiteInfo';
import Camp from './pages/Camping';
import Request from './pages/Request';
import ErrorPage from './pages/ErrorPage';

import myData from './data.json';

import { HashRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  localStorage.clear();
  localStorage.setItem('fav', JSON.stringify(myData.fav))
  return (
    <>
      <Router>
        <div style={{position: "sticky", top: "0", zIndex: "10000"}}>
          <NavbarApp/>
        </div>
        <div className="AppContent">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/campsite/:id" element={<CampsiteInfo />} />
            <Route path="/camping/:cId/:type/:id" element={<Camp />} />
            <Route path="/request" element={<Request />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
    </Router>
    </>
  );
}

export default App;

