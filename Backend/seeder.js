require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Temple = require('./models/Temple');
const Slot = require('./models/Slot');
const moment = require('moment');

// Sample data
const temples = [
  {
    name: 'Golden Temple',
    location: {
      address: '123 Divine Street',
      city: 'Amritsar',
      state: 'Punjab',
      pincode: '143001',
      coordinates: {
        lat: 31.6200,
        lng: 74.8765
      }
    },
    description: 'A beautiful historic temple known for its golden architecture.',
    images: ['golden-temple-1.jpg', 'golden-temple-2.jpg'],
    defaultOpenTime: '04:00 AM',
    defaultCloseTime: '10:00 PM',
    defaultSlotDuration: 60,
    defaultSlotCapacity: 20,
    specialInstructions: 'Please cover your head before entering. No photography allowed inside the main shrine.',
    contactInfo: {
      phone: '+91-1234567890',
      email: 'info@goldentemple.org',
      website: 'www.goldentemple.org'
    }
  },
  {
    name: 'Lotus Temple',
    location: {
      address: '456 Lotus Lane',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110019',
      coordinates: {
        lat: 28.5535,
        lng: 77.2588
      }
    },
    description: 'A Bahá í House of Worship notable for its flowerlike shape.',
    images: ['lotus-temple-1.jpg', 'lotus-temple-2.jpg'],
    defaultOpenTime: '09:00 AM',
    defaultCloseTime: '05:30 PM',
    defaultSlotDuration: 60,
    defaultSlotCapacity: 30,
    specialInstructions: 'Please maintain silence inside the temple. Photography allowed outside only.',
    contactInfo: {
      phone: '+91-9876543210',
      email: 'visit@lotustemple.in',
      website: 'www.lotustemple.in'
    }
  }
];

// Generate slots for next 7 days
const generateSlots = async (temple) => {
  const slots = [];
  const today = moment().startOf('day');
  
  // Loop through next 7 days
  for (let day = 0; day < 7; day++) {
    const currentDate = moment(today).add(day, 'days');
    const openTime = moment(temple.defaultOpenTime, 'hh:mm A');
    const closeTime = moment(temple.defaultCloseTime, 'hh:mm A');
    
    // Start time is the opening time
    let currentTime = openTime.clone();
    
    // Create slots until closing time
    while (currentTime.add(temple.defaultSlotDuration, 'minutes').isSameOrBefore(closeTime)) {
      const slotStartTime = currentTime.clone().subtract(temple.defaultSlotDuration, 'minutes').format('hh:mm A');
      const slotEndTime = currentTime.format('hh:mm A');
      
      // Calculate random booking count for demo
      const randomBookingCount = Math.floor(Math.random() * (temple.defaultSlotCapacity / 2));
      
      // Calculate status based on booking count
      let status = 'available';
      const percentBooked = (randomBookingCount / temple.defaultSlotCapacity) * 100;
      
      if (randomBookingCount >= temple.defaultSlotCapacity) {
        status = 'full';
      } else if (percentBooked >= 75) {
        status = 'almost-full';
      } else if (percentBooked >= 25) {
        status = 'filling';
      }
      
      slots.push({
        temple: temple._id,
        date: currentDate.toDate(),
        startTime: slotStartTime,
        endTime: slotEndTime,
        totalCapacity: temple.defaultSlotCapacity,
        bookedCount: randomBookingCount,
        status: status
      });
    }
  }
  
  return slots;
};

// Import data to database
const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Temple.deleteMany();
    await Slot.deleteMany();
    
    console.log('Data cleared...');
    
    // Insert temples
    const createdTemples = await Temple.insertMany(temples);
    console.log(`${createdTemples.length} temples inserted`);
    
    // Generate and insert slots
    let allSlots = [];
    
    for (const temple of createdTemples) {
      const templeSlots = await generateSlots(temple);
      allSlots = [...allSlots, ...templeSlots];
    }
    
    await Slot.insertMany(allSlots);
    console.log(`${allSlots.length} slots inserted`);
    
    console.log('Data import completed!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data from database
const destroyData = async () => {
  try {
    await connectDB();
    
    await Temple.deleteMany();
    await Slot.deleteMany();
    
    console.log('All data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}