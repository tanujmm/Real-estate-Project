import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offersRes, rentRes, saleRes] = await Promise.all([
          // fetch("http://localhost:8007/api/listing/get?offer=true&limit=4"),
          // fetch("http://localhost:8007/api/listing/get?type=rent&limit=4"),
          // fetch("http://localhost:8007/api/listing/get?type=sale&limit=4"),
          fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/listing/get?offer=true&limit=4`
          ),
          fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/listing/get?type=rent&limit=4`
          ),
          fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/listing/get?type=sale&limit=4`
          ),
        ]);

        const [offers, rents, sales] = await Promise.all([
          offersRes.json(),
          rentRes.json(),
          saleRes.json(),
        ]);

        setOfferListings(offers);
        setRentListings(rents);
        setSaleListings(sales);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const articles = [
    {
      title: "🏠 Tips for First-Time Homebuyers",
      summary:
        "Learn what to consider before buying your first property and avoid common pitfalls.",
      link: "https://www.zillow.com/home-buying-guide/first-time-home-buyer/",
    },
    {
      title: "💸 How to Sell Your Home Fast",
      summary:
        "Discover proven strategies to sell your home quickly and at a great price.",
      link: "https://www.opendoor.com/blog/sell/ways-to-sell-your-house-fast",
    },
    {
      title: "📊 Real Estate Market Trends 2025",
      summary:
        "Explore the latest housing market statistics and trends to make smarter investments.",
      link: "https://www.nar.realtor/research-and-statistics/housing-statistics",
    },
    {
      title: "📉 Should You Buy or Rent in 2025?",
      summary:
        "Weigh the pros and cons of buying vs. renting this year based on your lifestyle.",
      link: "https://www.nerdwallet.com/article/mortgages/rent-vs-buy",
    },
    {
      title: "🔧 Renovation Tips to Increase Home Value",
      summary:
        "Boost your property's worth with these impactful remodeling strategies.",
      link: "https://www.bankrate.com/real-estate/home-renovations-that-add-value/",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80)",
        }}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome to <span className="text-green-400">CodeEstate</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl text-gray-200 drop-shadow-md mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Discover the perfect space tailored to your lifestyle. Buy or rent
            from a wide range of high-quality listings.
          </motion.p>
          <motion.div
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link
              to="/search"
              className="bg-green-500 hover:bg-green-600 transition duration-200 ease-in-out text-white px-8 py-3 rounded-full text-lg shadow-md"
            >
              Browse Listings
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="px-4 md:px-12 py-10 bg-white">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">
          📰 Real Estate Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-50 rounded-lg shadow p-6 border hover:shadow-md transition block"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-slate-700">
                {article.title}
              </h3>
              <p className="text-slate-600 text-sm mb-3">{article.summary}</p>
              <span className="text-blue-600 hover:underline text-sm">
                Read more →
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <motion.div
        className="px-4 md:px-12 py-10 space-y-16 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Section
          title="🔥 Special Offers"
          listings={offerListings}
          loading={loading}
          link="/search?offer=true"
        />
        <Section
          title="🏡 Places for Rent"
          listings={rentListings}
          loading={loading}
          link="/search?type=rent"
        />
        <Section
          title="🏘️ Homes for Sale"
          listings={saleListings}
          loading={loading}
          link="/search?type=sale"
        />
      </motion.div>

      <footer className="bg-slate-800 text-white py-10 mt-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-3">About CodeEstate</h3>
            <p className="text-sm text-slate-300">
              CodeEstate is a full-stack real estate web app built to showcase
              skills in modern web development. Explore homes, manage listings,
              and learn from real code.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/search" className="hover:underline">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="hover:underline">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Contact</h3>
            <p className="text-sm text-slate-300">
              Email: support@codeestate.dev
            </p>
            <p className="text-sm text-slate-300">Location: India</p>
          </div>
        </div>
        <p className="text-center text-sm text-slate-400 mt-8">
          &copy; {new Date().getFullYear()} CodeEstate. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
};

const ProjectCard = ({ title, icon, description }) => (
  <motion.div
    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition border"
    whileHover={{ scale: 1.03 }}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm">{description}</p>
  </motion.div>
);

const Section = ({ title, listings, loading, link }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
      <Link
        to={link}
        className="text-green-600 hover:underline hover:text-green-700 transition"
      >
        Show all →
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <p className="text-slate-500 col-span-full">Loading...</p>
      ) : listings.length > 0 ? (
        listings.map((listing) => (
          <ListingItem key={listing._id} listing={listing} />
        ))
      ) : (
        <p className="text-slate-500 col-span-full">No listings found.</p>
      )}
    </div>
  </motion.div>
);

export default Home;
