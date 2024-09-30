import React from 'react';
import './App.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
            <SpeedInsights />
        </div>
    );
}

export default App;
