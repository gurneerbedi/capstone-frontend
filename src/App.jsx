import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DiscoverPage from "./pages/DiscoverPage";
import DiscoverResultsPage from "./pages/DiscoverResultsPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import ReadingTracker from "./components/ReadingTracker/ReadingTracker";


const App = ()  =>{
return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/discover" element={<DiscoverPage />}></Route>
            <Route path = "/discover/:moodQuery" element ={<DiscoverResultsPage/>}/>
            <Route path="/discover/:booktitle" element={<BookDetailsPage/>}/>
            <Route path = "/reading-tracker" element={<ReadingTracker/>}/>
        </Routes>
    </Router>
);
};

export default App;
