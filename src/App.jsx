import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DiscoverPage from "./pages/DiscoverPage";
import DiscoverResultsPage from "./pages/DiscoverResultsPage";


const App = ()  =>{
return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/discover" element={<DiscoverPage />}></Route>
            <Route path = "/discover/:moodQuery" element ={<DiscoverResultsPage/>}/>
        </Routes>
    </Router>
);
};

export default App;
