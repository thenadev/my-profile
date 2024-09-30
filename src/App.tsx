import { SpeedInsights } from "@vercel/speed-insights/react";
import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

const TRACKING_ID = "G-63C2KDFQHT";
ReactGA.initialize(TRACKING_ID);

function App() {
  ReactGA.pageview(window.location.pathname + window.location.search);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
    </div>
  );
}

export default App;
