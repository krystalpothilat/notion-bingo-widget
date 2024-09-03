import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.css";
import HomePage from './HomePage.js';
import AccountPage from './AccountPage.js';
import CustomizePage from './CreateWidgetPage.js';
import WidgetRenderComponent from './WidgetRenderComponent';
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/:widgetId" element={<WidgetRenderComponent/>}/>
        <Route path="/create" element = {<CustomizePage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
