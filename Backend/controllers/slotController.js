// Fix date handling in getSlots
const getSlots = async (req, res) => {
    try {
      const { templeId, date } = req.query;
      const query = { temple: templeId };
  
      if (date) {
        // Handle UTC dates properly
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);
        
        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);
  
        query.date = { $gte: startDate, $lte: endDate };
      }
  
      const slots = await Slot.find(query)
        .populate('temple', 'name address')
        .lean(); // Add lean() for better performance
  
      // Calculate virtual fields
      const processedSlots = slots.map(slot => ({
        ...slot,
        availableSpots: slot.totalCapacity - slot.bookedCount,
        status: calculateStatus(slot.totalCapacity, slot.bookedCount)
      }));
  
      res.json(processedSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Helper function for status calculation
  const calculateStatus = (total, booked) => {
    const available = total - booked;
    const percentage = (available / total) * 100;
  
    if (available <= 0) return 'full';
    if (percentage <= 10) return 'almost-full';
    if (percentage <= 30) return 'filling';
    return 'available';
  };