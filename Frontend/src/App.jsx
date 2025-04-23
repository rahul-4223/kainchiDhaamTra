import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/layouts/Navbar';
import Footer from './Components/layouts/Footer';
import HomePage from './pages/HomePage';
import SlotBooking from './pages/SlotBooking';
import RouteSelection from './pages/RouteSelection';
import Nearby from './pages/Nearby';
import TicketGenerator from './pages/Feedback';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import MainElement from './Components/layouts/MainElement';
import AdminLogin from './Components/layouts/Admin/Components/Login';
import DashboardLayout from './Components/layouts/Admin/Components/DashboardAdmin';
import TimeSlotManager from './Components/layouts/Admin/Components/TimeSlots';
import TrafficOverview from './Components/layouts/Admin/Components/TrafficOverview';
import Feedback from './pages/Feedback';

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route element={<MainElement/>}>
              <Route path="/" element={<HomePage />} />
              <Route path="/slot-booking" element={<SlotBooking />} />
              <Route path="/routes" element={<RouteSelection />} />
              <Route path="/Nearby" element={<Nearby/>} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/adminLogin" element={<AdminLogin />} />

            {/* Admin Routes with layout */}
            <Route path="/admin" element={<DashboardLayout />}>
  <Route path="dashboard" element={<TrafficOverview />} /> {/* Add this */}
  <Route path="time-slots" element={<TimeSlotManager />} />
</Route>


            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
