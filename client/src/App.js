import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/App.css";
import HomePage from './HomePage.js';
import AccountPage from './AccountPage.js';
import CustomizePage from './CustomizePage.js';
import Dashboard from './Dashboard.js';
import WidgetRenderComponent from './WidgetRenderComponent';
import PrivateRoute from './PrivateRoute.js';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<AccountPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/:widgetId" element={<WidgetRenderComponent/>}/>
        
         {/* must be logged in */}
         <Route path="/create" element={<PrivateRoute element={CustomizePage} />} />
        <Route path="/create/:widgetId" element={<PrivateRoute element={CustomizePage} />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
        
      </Routes>
    </Router>
  );
}

export default App;
