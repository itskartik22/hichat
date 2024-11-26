const User = require("../models/userModel");

exports.addContact = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    const matchingUser = await User.findOne({ mobile });
    if (matchingUser) {
      user.savedFriends.push(matchingUser._id);
    } else {
      user.savedContacts.push({ name, mobile });
    }
    await user.save();

    res.status(200).json({
      status: "success",
      data: user.savedContacts,
      message: "Contact saved successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const { search } = req.query;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "You are not logged in.",
      });
    }
    // const savedContacts = user.savedContacts;
    // const unavailableContacts = await savedContacts.map(async (contact) => {
    //   const matchingUser = await User.findOne({ mobile: contact.mobile });
    //   console.log("Contact", contact);
    //   console.log("Matching user", matchingUser);
    //   if (matchingUser) {
    //     user.savedFriends.push(matchingUser._id);
    //     return null;
    //   }
    //   return contact;
    // });
    // console.log("Unavailable contacts", await unavailableContacts);
    // user.savedContacts = unavailableContacts;
    // await user.save();
    // const availableContacts = await User.find({
    //   _id: { $in: user.savedFriends },
    //   $or: [
    //     { name: { $regex: search, $options: "i" } },
    //     { mobile: { $regex: search, $options: "i" } },
    //     { email: { $regex: search, $options: "i" } },
    //   ],
    //   //   email: { $regex: search, $options: "i" },
    // }).select(
    //   "-password -__v -createdAt -updatedAt --savedContacts --savedFriends --emailVerified"
    // );

    
    const savedContacts = user.savedContacts;

    // Fetch all users whose mobile numbers match the saved contacts
    const matchedUsers = await User.find({
      mobile: { $in: savedContacts.map((contact) => contact.mobile) },
    });

    // Map matched users to their IDs and determine unavailable contacts
    const matchedUserMobiles = matchedUsers.map((user) => user.mobile);
    const unavailableContacts = savedContacts.filter(
      (contact) => !matchedUserMobiles.includes(contact.mobile)
    );

    // Update user's saved friends and contacts
    user.savedFriends = [
      ...new Set([
        ...user.savedFriends,
        ...matchedUsers.map((user) => user._id.toString()),
      ]),
    ];
    user.savedContacts = unavailableContacts;
    await user.save();

    // Fetch available contacts based on search query
    const availableContacts = await User.find({
      _id: { $in: user.savedFriends },
      $or: [
        { name: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }).select(
      "-password -__v -createdAt -updatedAt -savedContacts -savedFriends -emailVerified"
    );

    const data = {
      availables: availableContacts,
      unavailables: unavailableContacts,
    };
    res.status(200).json({
      status: "success",
      data: data,
      message: "Contacts fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
