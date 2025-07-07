// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from "swiper";
// import { Navigation } from "swiper/modules";
// import "swiper/css/bundle";
// import Contact from "../components/Contact";
// import {
//   FaBath,
//   FaBed,
//   FaChair,
//   FaMapMarkerAlt,
//   FaParking,
//   FaShare,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix for default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
//   iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
//   shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
// });

// const Listing = () => {
//   SwiperCore.use([Navigation]);

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [contact, setContact] = useState(false);
//   const params = useParams();
//   const { currentUser } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           // `http://localhost:8007/api/listing/get/${params.listingId}`
//           // `${import.meta.env.VITE_BACKEND_URL}}/api/listing/get/${
//           //   params.listingId
//           // }`
//           `/api/listing/get/${params.listingId}`
//         );
//         const data = await res.json();

//         if (data.success === false) {
//           setError(true);
//           setLoading(false);
//           return;
//         }

//         if (!data.latitude || !data.longitude) {
//           const geoRes = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//               data.address
//             )}`
//           );
//           const geoData = await geoRes.json();
//           if (geoData && geoData.length > 0) {
//             data.latitude = parseFloat(geoData[0].lat);
//             data.longitude = parseFloat(geoData[0].lon);
//           }
//         }

//         setListing(data);
//         setLoading(false);
//       } catch (err) {
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchListing();
//   }, [params.listingId]);

//   return (
//     <main className="bg-gray-100 min-h-screen">
//       {loading && (
//         <p className="text-center py-12 text-2xl font-semibold text-slate-600">
//           Loading...
//         </p>
//       )}
//       {error && (
//         <p className="text-center py-12 text-2xl font-semibold text-red-600">
//           Something went wrong!!!
//         </p>
//       )}

//       {listing && !loading && !error && (
//         <div>
//           <Swiper navigation className="h-[500px]">
//             {listing.imageUrls.map((url) => (
//               <SwiperSlide key={url}>
//                 <div
//                   className="h-full w-full bg-cover bg-center"
//                   style={{ backgroundImage: `url(${url})` }}
//                 ></div>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white shadow cursor-pointer">
//             <FaShare
//               className="text-slate-500"
//               onClick={() => {
//                 navigator.clipboard.writeText(window.location.href);
//                 setCopied(true);
//                 setTimeout(() => setCopied(false), 2000);
//               }}
//             />
//           </div>

//           {copied && (
//             <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 shadow">
//               Link Copied!
//             </p>
//           )}

//           <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
//             <h1 className="text-4xl font-bold text-gray-800">
//               {listing.name} - $
//               {listing.offer
//                 ? listing.discountPrice.toLocaleString("en-US")
//                 : listing.regularPrice.toLocaleString("en-US")}
//               {listing.type === "rent" && "/month"}
//             </h1>

//             <p className="flex items-center gap-2 text-gray-600">
//               <FaMapMarkerAlt className="text-green-600" />
//               {listing.address}
//             </p>

//             <div className="flex flex-wrap gap-4 mt-4">
//               <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm shadow">
//                 {listing.type === "rent" ? "For Rent" : "For Sale"}
//               </span>
//               {listing.offer && (
//                 <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm shadow">
//                   ${+listing.regularPrice - +listing.discountPrice} OFF
//                 </span>
//               )}
//             </div>

//             <div className="text-lg text-slate-700">
//               <h2 className="text-xl font-semibold mb-2 underline decoration-green-600">
//                 Description
//               </h2>
//               <p>{listing.description}</p>
//             </div>

//             <ul className="flex flex-wrap gap-6 text-green-900 font-semibold text-sm">
//               <li className="flex items-center gap-2">
//                 <FaBed className="text-lg" />
//                 {listing.bedrooms > 1
//                   ? `${listing.bedrooms} beds`
//                   : `${listing.bedrooms} bed`}
//               </li>
//               <li className="flex items-center gap-2">
//                 <FaBath className="text-lg" />
//                 {listing.bathrooms > 1
//                   ? `${listing.bathrooms} baths`
//                   : `${listing.bathrooms} bath`}
//               </li>
//               <li className="flex items-center gap-2">
//                 <FaParking className="text-lg" />
//                 {listing.parking ? "Parking Spot" : "No Parking"}
//               </li>
//               <li className="flex items-center gap-2">
//                 <FaChair className="text-lg" />
//                 {listing.furnished ? "Furnished" : "UnFurnished"}
//               </li>
//             </ul>

//             {currentUser && !contact && (
//               <button
//                 onClick={() => setContact(true)}
//                 className="mt-4 bg-slate-700 text-white rounded-md px-6 py-2 uppercase text-sm hover:bg-slate-800"
//               >
//                 Contact Landlord
//               </button>
//             )}

//             {contact && <Contact listing={listing} />}

//             {listing.latitude && listing.longitude && (
//               <div className="mt-10">
//                 <h2 className="text-xl font-bold mb-3 text-slate-800">
//                   Property Location
//                 </h2>
//                 <div className="rounded-lg overflow-hidden shadow">
//                   <MapContainer
//                     center={[listing.latitude, listing.longitude]}
//                     zoom={13}
//                     scrollWheelZoom={false}
//                     style={{ height: "400px", width: "100%" }}
//                   >
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={[listing.latitude, listing.longitude]}>
//                       <Popup>{listing.address}</Popup>
//                     </Marker>
//                   </MapContainer>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </main>
//   );
// };

// export default Listing;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Contact from "../components/Contact";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const Listing = () => {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        // Try to populate missing coordinates on backend side (better solution)
        if (!data.latitude || !data.longitude) {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              data.address
            )}`
          );
          const geoData = await geoRes.json();
          if (geoData && geoData.length > 0) {
            data.latitude = parseFloat(geoData[0].lat);
            data.longitude = parseFloat(geoData[0].lon);
          }
        }

        setListing(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main className="bg-gray-100 min-h-screen">
      {loading && (
        <p className="text-center py-12 text-2xl font-semibold text-slate-600">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center py-12 text-2xl font-semibold text-red-600">
          Something went wrong!!!
        </p>
      )}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation className="h-[500px]">
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <img
                  src={url}
                  alt="listing"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white shadow cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 shadow">
              Link Copied!
            </p>
          )}

          <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {listing.name} - $
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-INR")
                : listing.regularPrice.toLocaleString("en-INR")}
              {listing.type === "rent" && "/month"}
            </h1>

            <p className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-green-600" />
              {listing.address}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm shadow">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </span>
              {listing.offer && (
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm shadow">
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </span>
              )}
            </div>

            <div className="text-lg text-slate-700">
              <h2 className="text-xl font-semibold mb-2 underline decoration-green-600">
                Description
              </h2>
              <p>{listing.description}</p>
            </div>

            <ul className="flex flex-wrap gap-6 text-green-900 font-semibold text-sm">
              <li className="flex items-center gap-2">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-2">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-2">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-2">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "UnFurnished"}
              </li>
            </ul>

            {currentUser && !contact && (
              <button
                onClick={() => setContact(true)}
                className="mt-4 bg-slate-700 text-white rounded-md px-6 py-2 uppercase text-sm hover:bg-slate-800"
              >
                Contact Landlord
              </button>
            )}

            {contact && <Contact listing={listing} />}

            {listing.latitude && listing.longitude ? (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-3 text-slate-800">
                  Property Location
                </h2>
                <div className="rounded-lg overflow-hidden shadow">
                  <MapContainer
                    center={[listing.latitude, listing.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "400px", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[listing.latitude, listing.longitude]}>
                      <Popup>{listing.address}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            ) : (
              <p className="text-red-500">
                Location not available for this listing.
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
