import { useState, useEffect } from 'react';
import { Star, Send, ThumbsUp, MapPin, User, Clock } from 'lucide-react';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('general');
  const [feedbackEntries, setFeedbackEntries] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 4,
      feedback: "The route suggestions helped me avoid the major congestion around the temple. Great improvement from my last visit!",
      category: "route_optimization",
      origin: "Delhi",
      date: "2025-04-15"
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 5,
      feedback: "I loved how accurate the crowd prediction was. I scheduled my visit based on the app's recommendation and had a smooth experience.",
      category: "traffic_prediction",
      origin: "Mumbai",
      date: "2025-04-18"
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 3,
      feedback: "The app works well most of the time, but during the festival it seemed to underestimate the traffic volume. Could use improvement for special events.",
      category: "suggestion",
      origin: "Dehradun",
      date: "2025-04-20"
    }
  ]);
  const [viewMode, setViewMode] = useState('form'); // 'form' or 'feedbacks'
  const [filterCategory, setFilterCategory] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new feedback entry
    const newEntry = {
      id: feedbackEntries.length + 1,
      name: name || "Anonymous",
      rating,
      feedback,
      category,
      origin,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Add new entry to the list
    setFeedbackEntries([newEntry, ...feedbackEntries]);
    
    // Show success message
    setSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setRating(0);
      setFeedback('');
      setName('');
      setOrigin('');
      setCategory('general');
      setSubmitted(false);
    }, 3000);
  };

  const filteredFeedbacks = filterCategory === 'all' 
    ? feedbackEntries 
    : feedbackEntries.filter(entry => entry.category === filterCategory);

  const categoryLabels = {
    'general': 'General Feedback',
    'route_optimization': 'Route Optimization',
    'user_interface': 'User Interface',
    'traffic_prediction': 'Traffic Prediction',
    'suggestion': 'Suggestions'
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center text-center">
          <ThumbsUp className="text-green-500 w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-green-700 mb-2">Thank You!</h2>
          <p className="text-green-600">Your feedback has been submitted successfully. It will help us improve the Kachi Dham traffic management system.</p>
          <button 
            onClick={() => setViewMode('feedbacks')} 
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            View All Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 p-4 text-white mt-6">
        <h2 className="text-2xl font-bold text-center">Kachi Dham Traffic Management System</h2>
        <div className="flex justify-center mt-2 space-x-4">
          <button 
            onClick={() => setViewMode('form')} 
            className={`px-4 py-1 rounded-md transition-colors ${viewMode === 'form' ? 'bg-white text-blue-600 font-medium' : 'bg-blue-500 hover:bg-blue-400'}`}
          >
            Submit Feedback
          </button>
          <button 
            onClick={() => setViewMode('feedbacks')} 
            className={`px-4 py-1 rounded-md transition-colors ${viewMode === 'feedbacks' ? 'bg-white text-blue-600 font-medium' : 'bg-blue-500 hover:bg-blue-400'}`}
          >
            View Feedbacks
          </button>
        </div>
      </div>

      {viewMode === 'form' ? (
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">Where are you from?</label>
                <input
                  type="text"
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City/Town/Village"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate Your Experience</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`cursor-pointer w-8 h-8 ${
                      (hoveredRating || rating) >= star
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Feedback Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="general">General Feedback</option>
                <option value="route_optimization">Route Optimization</option>
                <option value="user_interface">User Interface</option>
                <option value="traffic_prediction">Traffic Prediction Accuracy</option>
                <option value="suggestion">Suggestions for Improvement</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Please share your experience with our traffic management system..."
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Feedback
            </button>
          </form>
        </div>
      ) : (
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
            <select
              id="filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="general">General Feedback</option>
              <option value="route_optimization">Route Optimization</option>
              <option value="user_interface">User Interface</option>
              <option value="traffic_prediction">Traffic Prediction Accuracy</option>
              <option value="suggestion">Suggestions for Improvement</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map(entry => (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center mb-2">
                      <User className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="font-medium">{entry.name}</span>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < entry.rating 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{entry.origin || "Location not specified"}</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{entry.date}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {categoryLabels[entry.category]}
                    </span>
                  </div>
                  
                  <p className="text-gray-700">{entry.feedback}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No feedback entries found for this category.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}