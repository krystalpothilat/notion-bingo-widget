import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import "./styles/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import WidgetRenderComponent from './WidgetRenderComponent';
import CustomizePage from './CustomizePage';
import HomePage from './HomePage.js';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/:widgetId" element={<WidgetRenderComponent/>}/>
        <Route path="/create" element = {<CustomizePage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
