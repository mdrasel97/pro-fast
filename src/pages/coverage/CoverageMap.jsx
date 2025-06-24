import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

// Required to fix missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Map zoom helper
const FlyToLocation = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 10); // zoom level
    }
  }, [lat, lng, map]);
  return null;
};

// Coordinates for some major cities (can be expanded)
// const locations = [
//   { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
//   { name: "Chattogram", lat: 22.3569, lng: 91.7832 },
//   { name: "Khulna", lat: 22.8456, lng: 89.5403 },
//   { name: "Rajshahi", lat: 24.3745, lng: 88.6042 },
//   { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
// ];

const CoverageMap = ({ services }) => {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState(null);
  const inputRef = useRef();

  const handleSearch = () => {
    const value = search.toLowerCase();
    const found = services.find((d) =>
      d.district.toLowerCase().includes(value)
    );
    if (found) {
      setTarget({ lat: found.latitude, lng: found.longitude });
    } else {
      alert("District not found!");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  //   console.log(services);
  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      {/* Search box */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white p-2 rounded shadow-md flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search district..."
          className="input input-bordered input-sm w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-sm btn-primary" onClick={handleSearch}>
          Go
        </button>
      </div>
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))} */}
        {services.map((loc, index) => (
          <Marker key={index} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <h3 className="font-bold">
                {loc.city}, {loc.district}
              </h3>
              <p className="text-sm">
                Covered Areas: {loc.covered_area.join(", ")}
              </p>
              <a
                href={loc.flowchart}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >
                View Flowchart
              </a>
            </Popup>
          </Marker>
        ))}

        {/* Trigger map move */}
        {target && <FlyToLocation lat={target.lat} lng={target.lng} />}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
