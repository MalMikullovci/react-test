import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobSitesPage from './pages/JobSitesPage';
import JobSiteDetailPage from './pages/JobSiteDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/jobsites" replace />} />
        <Route path="/jobsites" element={<JobSitesPage />} />
        <Route path="/jobsites/:id" element={<JobSiteDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;