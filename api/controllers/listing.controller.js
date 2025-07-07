import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(403, "You can only delete your list"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(403, "You can only update your own listing!"));

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res) => {
  try {
    // Construct query object
    const query = {};

    // if (req.query.searchTerm) {
    //   query.name = { $regex: req.query.searchTerm, $options: "i" };

    // }
    if (req.query.searchTerm) {
      query.$or = [
        { name: { $regex: req.query.searchTerm, $options: "i" } },
        { address: { $regex: req.query.searchTerm, $options: "i" } },
      ];
    }

    if (req.query.type && req.query.type !== "all") {
      query.type = req.query.type;
    }

    if (req.query.parking === "true") {
      query.parking = true;
    }

    if (req.query.furnished === "true") {
      query.furnished = true;
    }

    if (req.query.offer === "true") {
      query.offer = true;
    }

    // Sorting
    const sortField = req.query.sort || "createdAt";
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    // Pagination
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Fetch data
    const listings = await Listing.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
