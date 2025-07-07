import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);

  const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        // const res = await fetch(`/api/user/${listing?.userRef}`, {
        const res = await fetch(`/api/user/${listing?.userRef}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef, currentUser]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            onChange={onChange}
            placeholder="Enter Your Message Here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name} &body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-87"
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
