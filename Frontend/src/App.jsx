// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/layouts/Navbar';
import Footer from './Components/layouts/Footer';
import HomePage from './pages/HomePage';
import SlotBooking from './pages/SlotBooking';
import RouteSelection from './pages/RouteSelection';
import TrafficStatus from './pages/TrafficStatus';
import TicketGenerator from './pages/TicketGenerator';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/slot-booking" element={<SlotBooking />} />
            <Route path="/routes" element={<RouteSelection />} />
            <Route path="/traffic" element={<TrafficStatus />} />
            <Route path="/ticket" element={<TicketGenerator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </BrowserRouter>
  );
}

export default App;