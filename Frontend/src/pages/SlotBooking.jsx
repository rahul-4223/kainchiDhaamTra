// the section are use for the book slote
import { useState } from 'react';
import { Calendar, Clock, Users, ChevronsRight } from 'lucide-react';

export default function SlotBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [visitorCount, setVisitorCount] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  

  const timeSlots = [
    { id: 1, time: "09:00 - 10:00", available: 45, total: 50, status: "available" },
    { id: 2, time: "10:00 - 11:00", available: 28, total: 50, status: "available" },
    { id: 3, time: "11:00 - 12:00", available: 15, total: 50, status: "filling" },
    { id: 4, time: "12:00 - 13:00", available: 5, total: 50, status: "almost-full" },
    { id: 5, time: "13:00 - 14:00", available: 0, total: 50, status: "full" },
    { id: 6, time: "14:00 - 15:00", available: 32, total: 50, status: "available" },
    { id: 7, time: "15:00 - 16:00", available: 22, total: 50, status: "available" },
    { id: 8, time: "16:00 - 17:00", available: 47, total: 50, status: "available" },
  ];
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case "available": return "bg-green-100 text-green-800";
      case "filling": return "bg-yellow-100 text-yellow-800";
      case "almost-full": return "bg-orange-100 text-orange-800";
      case "full": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case "available": return "Available";
      case "filling": return "Filling";
      case "almost-full": return "Almost Full";
      case "full": return "Full";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Book Your Visit Slot</h1>
          <p className="mt-2 text-lg text-gray-600">
            Select a date, time slot, and number of visitors for your temple visit
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Select Date & Time</span>
            </div>
            <div className="mx-4 w-20 h-1 bg-gray-200">
              <div className={`h-full ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Visitor Details</span>
            </div>
            <div className="mx-4 w-20 h-1 bg-gray-200">
              <div className={`h-full ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Confirmation</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          {currentStep === 1 && (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <div className="flex items-center p-4 border rounded-lg">
                  <Calendar className="text-indigo-600 mr-2" />
                  <input 
                    type="date" 
                    className="form-input block w-full sm:text-sm border-gray-300 rounded-md"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">Selected: {formatDate(selectedDate)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {timeSlots.map((slot) => (
                    <div 
                      key={slot.id}
                      onClick={() => slot.available > 0 && setSelectedSlot(slot)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedSlot?.id === slot.id 
                          ? 'border-indigo-500 ring-2 ring-indigo-200' 
                          : 'hover:border-gray-300'
                      } ${slot.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Clock size={16} className="text-indigo-600 mr-2" />
                          <span className="font-medium">{slot.time}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(slot.status)}`}>
                          {getStatusText(slot.status)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Users size={14} className="mr-1" />
                        <span>{slot.available} of {slot.total} slots available</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedSlot && (
                <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-800">Selected Slot Summary</h3>
                  <div className="mt-2 text-sm text-indigo-700">
                    <p>Date: {formatDate(selectedDate)}</p>
                    <p>Time: {selectedSlot.time}</p>
                    <p>Available Slots: {selectedSlot.available} of {selectedSlot.total}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Visitor Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Visitors
                  </label>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))}
                      className="p-2 border rounded-l-md hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={visitorCount}
                      onChange={(e) => setVisitorCount(Math.min(Math.max(1, parseInt(e.target.value) || 1), selectedSlot?.available || 5))}
                      className="p-2 w-16 text-center border-t border-b"
                      min="1"
                      max={selectedSlot?.available || 5}
                    />
                    <button 
                      onClick={() => setVisitorCount(Math.min(visitorCount + 1, selectedSlot?.available || 5))}
                      className="p-2 border rounded-r-md hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  {selectedSlot && (
                    <p className="mt-1 text-sm text-gray-500">
                      Maximum {selectedSlot.available} visitors allowed for this slot
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name
                  </label>
                  <input 
                    type="text" 
                    className="form-input block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className="form-input block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address (optional)
                  </label>
                  <input 
                    type="email" 
                    className="form-input block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
                <p className="mt-2 text-gray-600">Your slot has been reserved successfully</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Booking Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{formatDate(selectedDate)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time Slot</p>
                    <p className="font-medium">{selectedSlot?.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Visitors</p>
                    <p className="font-medium">{visitorCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Booking ID</p>
                    <p className="font-medium">DVDR-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Your digital entry pass has been generated. You can download it or access it from your account.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Download Entry Pass
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    View Best Route
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button 
                onClick={handlePrevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
            )}
            
            {currentStep < 3 ? (
              <button 
                onClick={handleNextStep}
                disabled={currentStep === 1 && !selectedSlot}
                className={`ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ${
                  currentStep === 1 && !selectedSlot ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {currentStep === 2 ? 'Confirm Booking' : 'Next'}
                <ChevronsRight size={16} className="ml-2" />
              </button>
            ) : (
              <button 
                className="ml-auto inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Return to Home
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}