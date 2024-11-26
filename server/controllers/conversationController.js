const Conversation = require("../models/conversationModel");


exports.getConversations = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }
    console.log("User", user);
    const conversations = await Conversation.aggregate([
      {
        $match: {
          $or: [{ sender: user._id }, { receiver: user._id }],
        },
      },
      {
        $lookup: {
          from: "users", // Collection name for users
          localField: "receiver",
          foreignField: "_id",
          as: "receiverDetails",
        },
      },
      {
        $lookup: {
          from: "messages", // Collection name for messages
          localField: "messages", // Field referencing messages in Conversation schema
          foreignField: "_id",
          as: "messages",
        },
      },
      {
        $addFields: {
          latestMessage: {
            $arrayElemAt: [
              { $sortArray: { input: "$messages", sortBy: { createdAt: -1 } } },
              0,
            ],
          },
        },
      },
      //   {
      //     $project: {
      //         _id: 1,

      //       receiverDetails: {
      //         name: 1,
      //         mobile: 1,
      //         profilePicture: 1,
      //         email: 1,
      //       },
      //       latestMessage: 1,
      //     },
      //   },
    ]);

    console.log("Conversations", conversations);
    res.status(200).json({
      status: "success",
      data: conversations,
      message: "Conversations fetched successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
