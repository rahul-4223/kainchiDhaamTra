import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const TrafficOverlay = ({ trafficData }) => {
  return (
    <>
      {trafficData.map((point, index) => (
        <Marker
          key={index}
          position={[point.lat, point.lng]}
          icon={L.divIcon({
            className: `w-4 h-4 rounded-full ${point.density > 50 ? 'bg-red-500' : 'bg-green-500'}`,
            iconSize: [16, 16]
          })}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">Traffic Density: {point.density}%</h3>
              <p>Vehicles: {point.vehicles}</p>
              <p>Last updated: {new Date(point.timestamp).toLocaleTimeString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default function TrafficDashboard() {
  const [trafficData] = useState([
    { lat: 29.3941, lng: 79.1234, density: 75, vehicles: 150, timestamp: Date.now() },
    // Add more mock data points
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Real-time Traffic Monitoring</h1>
      <div className="bg-white rounded-lg shadow-lg p-4 h-[600px]">
        <MapContainer
          center={[29.3941, 79.1234]}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <TrafficOverlay trafficData={trafficData} />
        </MapContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-3 bg-red-100 text-red-700 rounded-lg">
          Activate Route 1 (Current)
        </button>
        <button className="p-3 bg-green-100 text-green-700 rounded-lg">
          Switch to Route 2
        </button>
        <button className="p-3 bg-blue-100 text-blue-700 rounded-lg">
          Force One-way Traffic
        </button>
      </div>
    </div>
  );
}