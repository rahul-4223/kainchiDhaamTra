// import React, { useState, useEffect } from "react";
// import React from 'react'
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// const areas = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
// const connections = {
//   A: ["B", "D"], B: ["A", "C", "E"], C: ["B", "F"],
//   D: ["A", "E", "G"], E: ["B", "D", "F", "H"], F: ["C", "E", "I"],
//   G: ["D", "H"], H: ["E", "G", "I"], I: ["F", "H"]
// };

// function TrafficStatus()  {
//   const [vehicles, setVehicles] = useState([]);
//   const [running, setRunning] = useState(false);
//   const [spawnRate, setSpawnRate] = useState(2);
//   const [emergencyMode, setEmergencyMode] = useState(false);
//   const [congestion, setCongestion] = useState({});

//   useEffect(() => {
//     if (!running) return;
//     const interval = setInterval(() => {
//       spawnVehicle();
//     }, 3000 / spawnRate);
//     return () => clearInterval(interval);
//   }, [running, spawnRate]);

//   const spawnVehicle = () => {
//     const source = areas[Math.floor(Math.random() * areas.length)];
//     let destination = areas[Math.floor(Math.random() * areas.length)];
//     while (destination === source) destination = areas[Math.floor(Math.random() * areas.length)];

//     const newVehicle = {
//       id: Date.now(),
//       current: source,
//       destination,
//       path: [source],
//       reached: false,
//     };
//     setVehicles((v) => [...v, newVehicle]);
//     setCongestion((prev) => ({ ...prev, [source]: (prev[source] || 0) + 1 }));
//   };

//   const toggleRunning = () => setRunning((r) => !r);
//   const handleEmergency = () => setEmergencyMode((m) => !m);

//   const congestionData = areas.map((area) => ({ name: area, vehicles: congestion[area] || 0 }));
//   const hotspots = congestionData.filter((d) => d.vehicles >= 5);

//   return (
//     <>
//     <div className="grid grid-cols-5 gap-4 p-4">
//       {/* Controls */}
//       <Card className="col-span-1">
//         <CardContent className="flex flex-col gap-4">
//           <Button onClick={toggleRunning}>{running ? "Pause" : "Start"}</Button>
//           <div>
//             <label>Spawn Rate: {spawnRate}</label>
//             <Slider defaultValue={[spawnRate]} min={1} max={5} step={1} onValueChange={(val) => setSpawnRate(val[0])} />
//           </div>
//           <div className="flex items-center gap-2">
//             <Switch checked={emergencyMode} onCheckedChange={handleEmergency} />
//             <span>Emergency Mode</span>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Map Simulation */}
//       <Card className="col-span-3 flex flex-wrap justify-center items-center h-[400px]">
//         <CardContent className="flex flex-wrap justify-center items-center gap-4">
//           {areas.map((area) => (
//             <div
//               key={area}
//               className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
//                 (congestion[area] || 0) >= 5
//                   ? "bg-red-600"
//                   : (congestion[area] || 0) >= 3
//                   ? "bg-yellow-400"
//                   : "bg-green-500"
//               }`}
//             >
//               {area}
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Charts + Hotspots */}
//       <Card className="col-span-1">
//         <CardContent className="flex flex-col gap-4">
//           <h2 className="text-lg font-semibold">Hotspots</h2>
//           <ul className="list-disc list-inside">
//             {hotspots.length ? hotspots.map((h) => <li key={h.name}>{h.name} ({h.vehicles})</li>) : <li>None</li>}
//           </ul>
//           <BarChart width={200} height={150} data={congestionData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="vehicles" fill="#3b82f6" />
//           </BarChart>
//         </CardContent>
//       </Card>
//     </div>
    
//   );
// }
// export default 
// import React from 'react'

// function TrafficStatus() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default TrafficStatus

import React from 'react'

function TrafficStatus() {
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default TrafficStatus
