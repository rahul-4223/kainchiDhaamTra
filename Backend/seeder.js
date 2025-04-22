// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Temple = require('./models/Temple');
const Slot = require('./models/Slot');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample data
const temples = [
  {
    name: 'Sri Venkateshwara Temple',
    address: '123 Temple St, City, State 12345',
    description: 'Famous temple dedicated to Lord Venkateshwara.',
    maxVisitorsPerSlot: 50,
    image: 'venkateshwara-temple.jpg'
  },
  {
    name: 'Shiva Temple',
    address: '456 Divine Rd, City, State 12345',
    description: 'Ancient temple dedicated to Lord Shiva.',
    maxVisitorsPerSlot: 40,
    image: 'shiva-temple.jpg'
  },
  {
    name: 'Lakshmi Narasimha Temple',
    address: '789 Sacred Ave, City, State 12345',
    description: 'Beautiful temple dedicated to Goddess Lakshmi and Lord Narasimha.',
    maxVisitorsPerSlot: 60,
    image: 'lakshmi-narasimha-temple.jpg'
  }
];

// Function to generate time slots for a temple
const generateTempleSlots = async (templeId, date) => {
  const timeSlots = [
    { startTime: '09:00', endTime: '10:00', capacity: 50 },
    { startTime: '10:00', endTime: '11:00', capacity: 50 },
    { startTime: '11:00', endTime: '12:00', capacity: 50 },
    { startTime: '12:00', endTime: '13:00', capacity: 50 },
    { startTime: '13:00', endTime: '14:00', capacity: 50 },
    { startTime: '14:00', endTime: '15:00', capacity: 50 },
    { startTime: '15:00', endTime: '16:00', capacity: 50 },
    { startTime: '16:00', endTime: '17:00', capacity: 50 }
  ];

  const slots = [];
  
  for (let i = 0; i < timeSlots.length; i++) {
    const slot = new Slot({
      temple: templeId,
      date: date,
      startTime: timeSlots[i].startTime,
      endTime: timeSlots[i].endTime,
      totalCapacity: timeSlots[i].capacity,
      availableSpots: timeSlots[i].capacity - Math.floor(Math.random() * 30) // Random number of booked spots
    });
    
    await slot.save();
    slots.push(slot);
  }
  
  return slots;
};

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Temple.deleteMany();
    await Slot.deleteMany();
    
    // Insert temples
    const createdTemples = await Temple.insertMany(temples);
    console.log('Temples imported!');
    
    // Generate slots for today and next 7 days
    for (const temple of createdTemples) {
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        await generateTempleSlots(temple._id, date);
      }
    }
    
    console.log('Slots generated!');
    console.log('Data Import Complete!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Temple.deleteMany();
    await Slot.deleteMany();
    
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check if the -d flag was provided
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}