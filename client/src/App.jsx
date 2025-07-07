import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import "leaflet/dist/leaflet.css";

import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import UpdateListing from "./pages/UpdateListing";
import Search from "./pages/Search";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/listing/:listingId" element={<Listing />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/create-listing" element={<CreateListing />}></Route>
            <Route
              path="/update-listing/:listingId"
              element={<UpdateListing />}
            ></Route>
          </Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
