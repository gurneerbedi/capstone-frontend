import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DiscoverPage from "./pages/DiscoverPage";
import DiscoverResultsPage from "./pages/DiscoverResultsPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import ReadingTracker from "./components/ReadingTracker/ReadingTracker";

const App = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route
                    path="/discover/:moodQuery"
                    element={<DiscoverResultsPage />}
                />
                <Route
                    path="/discover/:booktitle"
                    element={<BookDetailsPage />}
                />
                <Route
                    path="/reading-tracker"
                    element={<ReadingTracker user={user} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
