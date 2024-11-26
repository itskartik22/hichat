const mongoose = require("mongoose");
const Conversation = require("../models/conversationModel");

const getRecentChats = async (userId) => {
  try {
    console.log("User Id", userId);

    const recentChats = await Conversation.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { receiver: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "senderDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "receiver",
          foreignField: "_id",
          as: "receiverDetails",
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "messages",
        },
      },
      {
        $addFields: {
          latestMessage: {
            $arrayElemAt: [
              {
                $sortArray: { input: "$messages", sortBy: { createdAt: -1 } },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          unseenMessageCount: {
            $size: {
              $filter: {
                input: "$messages",
                as: "message",
                cond: {
                  $and: [
                    { $eq: ["$$message.seen", false] },
                    { $ne: ["$$message.sender", new mongoose.Types.ObjectId(userId)] },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          senderDetails: {
            _id: 1,
            name: 1,
            mobile: 1,
            profilePicture: 1,
            email: 1,
          },
          receiverDetails: {
            _id: 1,
            name: 1,
            mobile: 1,
            profilePicture: 1,
            email: 1,
          },
          latestMessage: 1,
          unseenMessageCount: 1,
        },
      },
    ]);

    return recentChats;
  } catch (error) {
    console.error("Error fetching recent chats:", error);
    return [];
  }
};

module.exports = getRecentChats;
