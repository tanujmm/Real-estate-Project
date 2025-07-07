import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can view your own listings!"));
  }
};

export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404, "User not found");

    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// export const getUserListings = async (req, res, next) => {
//   try {
//     const loggedInUserId = req.user._id?.toString() || req.user.id;
//     const requestedUserId = req.params.id;

//     if (loggedInUserId !== requestedUserId) {
//       return next(errorHandler(401, "You can view your own listings!"));
//     }

//     const listings = await Listing.find({ userRef: requestedUserId });

//     res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };

// try {
//   if (req.user.id !== req.params.id)
//     return next(errorHandler(403, "You can only update your own account!"));

//   if (req.body.password) {
//     req.body.password = bcrypt.hashSync(req.body.password, 10);
//   }
//   const updateUser = await User.findByIdAndUpdate(
//     req.params.id,

//     { $set: req.body },

//     { new: true }
//   );
//   if (!updatedUser) {
//     return next(errorHandler(404, "User not found"));
//   }

//   const { password, ...rest } = updateUser._doc;
//   res.status(200).json(rest);
// } catch (error) {
//   next(error);
// }
