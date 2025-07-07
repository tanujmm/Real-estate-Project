// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ListingItem from "../components/ListingItem";
// const Search = () => {
//   const [loading, setLoading] = useState(false);
//   const [listings, setListings] = useState([]);
//   const [showMore, setShowMore] = useState(false);
//   const [sidebardata, setSidebardata] = useState({
//     searchTerm: "",
//     type: "all",
//     parking: false,
//     furnished: false,
//     offer: false,
//     sort: "created_at",
//     order: "desc",
//   });

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const searchTermFormUrl = urlParams.get("searchTerm");
//     const typeFormUrl = urlParams.get("type");
//     const parkingFormUrl = urlParams.get("parking");
//     const furnishedFormUrl = urlParams.get("furnished");
//     const offerFormUrl = urlParams.get("offer");
//     const sortFormUrl = urlParams.get("sort");
//     const orderFormUrl = urlParams.get("order");

//     if (
//       searchTermFormUrl ||
//       typeFormUrl ||
//       parkingFormUrl ||
//       furnishedFormUrl ||
//       offerFormUrl ||
//       sortFormUrl ||
//       orderFormUrl
//     ) {
//       setSidebardata({
//         ...sidebardata,
//         searchTerm: searchTermFormUrl || "",
//         type: typeFormUrl || "all",
//         parking: parkingFormUrl === "true" ? true : false,
//         furnished: furnishedFormUrl === "true" ? true : false,
//         offer: offerFormUrl === "true" ? true : false,
//         sort: sortFormUrl || "created_at",
//         order: orderFormUrl || "desc",
//       });
//     }
//     const fetchListings = async () => {
//       setLoading(true);
//       const searchQuery = urlParams.toString();
//       // const res = await fetch(`/api/listing/get?${searchQuery}`);
//       const res = await fetch(
//         `http://localhost:8007/api/listing/get?${searchQuery}`
//       );

//       const data = await res.json();
//       setListings(data);
//       setLoading(false);
//     };
//     fetchListings();
//   }, [location.search]);

//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     if (
//       e.target.id === "all" ||
//       e.target.id === "rent" ||
//       e.target.id === "sale"
//     ) {
//       setSidebardata({
//         ...sidebardata,
//         type: e.target.id,
//       });
//     }
//     if (e.target.id === "searchTerm") {
//       setSidebardata({
//         ...sidebardata,
//         searchTerm: e.target.value,
//       });
//     }
//     if (
//       e.target.id === "parking" ||
//       e.target.id === "furnished" ||
//       e.target.id === "offer"
//     ) {
//       setSidebardata({
//         ...sidebardata,
//         // [e.target.id]: e.target.checked === "true" ? true : false,
//         [e.target.id]: e.target.checked,
//       });
//     }
//     if (e.target.id === "sort_order") {
//       const sort = e.target.value.split("_")[0] || "created_at";
//       const order = e.target.value.split("_")[1] || "desc";

//       setSidebardata({
//         ...sidebardata,
//         sort,
//         order,
//       });
//     }
//   };

//   const handleShowMore = async () => {
//     const numberShown = listings.length;
//     const urlParams = new URLSearchParams(location.search);
//     urlParams.set("startIndex", numberShown);
//     urlParams.set("limit", 10);

//     const res = await fetch(
//       `http://localhost:8007/api/listing/get?${urlParams.toString()}`
//     );
//     const data = await res.json();
//     if (data.length < 10) setShowMore(false);
//     setListings((prev) => [...prev, ...data]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams();
//     urlParams.set("searchTerm", sidebardata.searchTerm);
//     urlParams.set("type", sidebardata.type);
//     urlParams.set("parking", sidebardata.parking);
//     urlParams.set("furnished", sidebardata.furnished);
//     urlParams.set("offer", sidebardata.offer);
//     urlParams.set("sort", sidebardata.sort);
//     urlParams.set("order", sidebardata.order);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };
//   return (
//     <div className="flex flex-col md:flex-row">
//       <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
//         <form action="" onSubmit={handleSubmit} className="flex flex-col gap-8">
//           <div className="flex items-center gap-2">
//             <label className="whitespace-nowrap font-semibold">
//               Search Item:
//             </label>
//             <input
//               type="text"
//               id="searchTerm"
//               placeholder="Search..."
//               className="border rounded-lg p-3 w-full"
//               onChange={handleChange}
//               value={sidebardata.searchTerm}
//             />
//           </div>
//           <div className="flex gap-2 flex-wrap items-center">
//             <label htmlFor="" className="font-semibold">
//               Type:
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="all"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sidebardata.type === "all"}
//               />
//               <span>Rent & Sale</span>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="rent"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sidebardata.type === "rent"}
//               />
//               <span>Rent</span>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="sale"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sidebardata.type === "sale"}
//               />
//               <span>Sale</span>
//             </div>
//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="offer"
//                 className="w-5"
//                 onChange={handleChange}
//                 // checked={sidebardata.type === "offer"}
//                 checked={sidebardata.offer}
//               />
//               <span>Offer</span>
//             </div>
//           </div>

//           <div className="flex gap-2 flex-wrap items-center">
//             <label className="font-semibold">Amenities:</label>

//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="parking"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sidebardata.parking}
//               />
//               <span>Parking</span>
//             </div>

//             <div className="flex gap-2">
//               <input
//                 type="checkbox"
//                 id="furnished"
//                 className="w-5"
//                 onChange={handleChange}
//                 checked={sidebardata.furnished}
//               />
//               <span>Furnished</span>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <label htmlFor="" className="font-semibold">
//               Sort:
//             </label>
//             <select
//               id="sort_order"
//               className="border rounded-lg p-3"
//               defaultValue={"created_at_desc"}
//               onChange={handleChange}
//             >
//               <option value="regularPrice_desc">Price high to low</option>
//               <option value="regularPrice_asc">Price low to high</option>
//               <option value="createdAt_desc">Latest</option>
//               <option value="createdAt_asc">Oldest</option>
//             </select>
//           </div>
//           <button className="bg-slate-700 text-white p-3 rounded-lg">
//             Search
//           </button>
//         </form>
//       </div>

//       <div className="flex-1">
//         <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">
//           Listing Results:
//         </h1>

//         <div className="p-7 flex flex-wrap gap-4">
//           {!loading && listings.length === 0 && (
//             <p className="text-xl text-slate-700">No Listing Found</p>
//           )}
//           {loading && (
//             <p className="text-xl text-slate-700 text-center w-full">
//               Loading...
//             </p>
//           )}

//           {!loading &&
//             listings &&
//             listings.map((listing) => (
//               <ListingItem key={listing._id} listing={listing} />
//             ))}

//           {showMore && (
//             <button
//               onClick={handleShowMore}
//               className="text-green-700 hover:underline p-7 text-center"
//             >
//               Show More
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Search;

// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import ListingItem from "../components/ListingItem";
// // import { motion } from "framer-motion";

// // const Home = () => {
// //   const [offerListings, setOfferListings] = useState([]);
// //   const [rentListings, setRentListings] = useState([]);
// //   const [saleListings, setSaleListings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchListings = async () => {
// //       try {
// //         const [offersRes, rentRes, saleRes] = await Promise.all([
// //           fetch("http://localhost:8007/api/listing/get?offer=true&limit=4"),
// //           fetch("http://localhost:8007/api/listing/get?type=rent&limit=4"),
// //           fetch("http://localhost:8007/api/listing/get?type=sale&limit=4"),
// //         ]);

// //         const [offers, rents, sales] = await Promise.all([
// //           offersRes.json(),
// //           rentRes.json(),
// //           saleRes.json(),
// //         ]);

// //         setOfferListings(offers);
// //         setRentListings(rents);
// //         setSaleListings(sales);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Failed to fetch listings:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchListings();
// //   }, []);

// //   return (
// //     <div className="bg-gray-50">
// //       {/* Hero Section */}
// //       <div className="relative h-[600px] bg-[url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914')] bg-cover bg-center">
// //         <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-4">
// //           <motion.h1
// //             initial={{ opacity: 0, y: 40 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="text-5xl font-extrabold mb-4 drop-shadow-lg"
// //           >
// //             Find Your Dream <span className="text-green-400">Home</span>
// //           </motion.h1>
// //           <p className="text-xl mb-6 max-w-2xl">
// //             Search from hundreds of quality listings and make your homeownership
// //             journey easy.
// //           </p>
// //           <Link
// //             to="/search"
// //             className="bg-green-500 hover:bg-green-600 px-8 py-3 text-lg rounded-full shadow-md transition"
// //           >
// //             Start Exploring
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Why Choose Us */}
// //       <section className="py-16 px-6 bg-gradient-to-br from-green-50 to-white text-center">
// //         <h2 className="text-4xl font-bold mb-8 text-slate-800">
// //           Why Choose This Project?
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
// //           {[
// //             {
// //               title: "Learning by Building",
// //               desc: "Hands-on React, Node.js & MongoDB development experience.",
// //             },
// //             {
// //               title: "Real-World Project",
// //               desc: "Build a production-ready real estate platform with modern UI/UX.",
// //             },
// //             {
// //               title: "Deployment & Hosting",
// //               desc: "Deploy with Render/Vercel and understand CI/CD basics.",
// //             },
// //           ].map((card, idx) => (
// //             <motion.div
// //               key={idx}
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.4, delay: idx * 0.2 }}
// //               className="bg-white p-6 rounded-xl shadow-md"
// //             >
// //               <h3 className="text-xl font-semibold text-green-700 mb-2">
// //                 {card.title}
// //               </h3>
// //               <p className="text-slate-600">{card.desc}</p>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Featured Listings */}
// //       <section className="px-6 py-16 bg-white space-y-16">
// //         <Section
// //           title="🔥 Special Offers"
// //           listings={offerListings}
// //           loading={loading}
// //           link="/search?offer=true"
// //         />
// //         <Section
// //           title="🏡 Places for Rent"
// //           listings={rentListings}
// //           loading={loading}
// //           link="/search?type=rent"
// //         />
// //         <Section
// //           title="🏘️ Homes for Sale"
// //           listings={saleListings}
// //           loading={loading}
// //           link="/search?type=sale"
// //         />
// //       </section>

// //       {/* Testimonials */}
// //       <section className="bg-gray-100 py-16 px-6">
// //         <h2 className="text-4xl font-bold text-center text-slate-800 mb-10">
// //           What Developers Say
// //         </h2>
// //         <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
// //           {[
// //             "Clean code structure",
// //             "Great learning experience",
// //             "UI looks amazing",
// //           ].map((text, i) => (
// //             <motion.div
// //               key={i}
// //               initial={{ opacity: 0, y: 30 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.5, delay: i * 0.1 }}
// //               className="bg-white rounded-xl p-6 shadow"
// //             >
// //               <p className="text-slate-700 italic">“{text}”</p>
// //               <p className="text-sm text-slate-500 mt-2">- Student Developer</p>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // const Section = ({ title, listings, loading, link }) => (
// //   <div className="max-w-7xl mx-auto">
// //     <div className="flex justify-between items-center mb-6 px-2">
// //       <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
// //       <Link
// //         to={link}
// //         className="text-green-600 hover:underline hover:text-green-700 transition"
// //       >
// //         Show all →
// //       </Link>
// //     </div>
// //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
// //       {loading ? (
// //         <p className="text-slate-500 col-span-full">Loading...</p>
// //       ) : listings.length > 0 ? (
// //         listings.map((listing) => (
// //           <ListingItem key={listing._id} listing={listing} />
// //         ))
// //       ) : (
// //         <p className="text-slate-500 col-span-full">No listings found.</p>
// //       )}
// //     </div>
// //   </div>
// // );

// // export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { motion } from "framer-motion";
import { Search, Home, Tag, Car, Sofa, Sparkles, Filter } from "lucide-react";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFormUrl = urlParams.get("searchTerm");
    const typeFormUrl = urlParams.get("type");
    const parkingFormUrl = urlParams.get("parking");
    const furnishedFormUrl = urlParams.get("furnished");
    const offerFormUrl = urlParams.get("offer");
    const sortFormUrl = urlParams.get("sort");
    const orderFormUrl = urlParams.get("order");

    if (
      searchTermFormUrl ||
      typeFormUrl ||
      parkingFormUrl ||
      furnishedFormUrl ||
      offerFormUrl ||
      sortFormUrl ||
      orderFormUrl
    ) {
      setSidebardata({
        ...sidebardata,
        searchTerm: searchTermFormUrl || "",
        type: typeFormUrl || "all",
        parking: parkingFormUrl === "true",
        furnished: furnishedFormUrl === "true",
        offer: offerFormUrl === "true",
        sort: sortFormUrl || "created_at",
        order: orderFormUrl || "desc",
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        // `http://localhost:8007/api/listing/get?${searchQuery}`
        `${import.meta.env.VITE_BACKEND_URL}/api/listing/get?${searchQuery}`
      );
      const data = await res.json();
      setListings(data);
      setLoading(false);
      setShowMore(data.length === 10);
    };
    fetchListings();
  }, [location.search]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({
        ...sidebardata,
        type: e.target.id,
      });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({
        ...sidebardata,
        searchTerm: e.target.value,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({
        ...sidebardata,
        sort,
        order,
      });
    }
  };

  const handleShowMore = async () => {
    const numberShown = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", numberShown);
    urlParams.set("limit", 10);
    const res = await fetch(
      // `http://localhost:8007/api/listing/get?${urlParams.toString()}`
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/listing/get?${urlParams.toString()}`
    );
    const data = await res.json();
    if (data.length < 10) setShowMore(false);
    setListings((prev) => [...prev, ...data]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="p-7 border-b-2 md:border-r-2 md:min-h-screen"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-slate-600" />
            <label className="whitespace-nowrap font-semibold">
              Search Item:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              onChange={handleChange}
              value={sidebardata.searchTerm}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <Filter className="w-5 h-5 text-slate-600" />
            <label className="font-semibold">Type:</label>
            {["all", "rent", "sale"].map((type) => (
              <div key={type} className="flex gap-2">
                <input
                  type="checkbox"
                  id={type}
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === type}
                />
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <Tag className="w-4 h-4 text-green-600" />
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <Sparkles className="w-5 h-5 text-slate-600" />
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <Car className="w-4 h-4 text-blue-600" />
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <Sofa className="w-4 h-4 text-purple-600" />
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3"
              defaultValue="created_at_desc"
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800 transition">
            Search
          </button>
        </form>
      </motion.div>

      <motion.div
        className="flex-1"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">
          Listing Results:
        </h1>

        <motion.div
          className="p-7 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No Listing Found</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-green-700 hover:underline p-7 text-center"
            >
              Show More
            </button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SearchPage;
