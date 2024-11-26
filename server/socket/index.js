const express = require("express");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const http = require("http");
const { Socket } = require("dgram");
const { getUserDetailsByToken } = require("../utils/getUserDetailsByToken");
const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const getRecentChats = require("../utils/getRecentChats");

dotenv.config();
const app = express();

//***Socket.io connection */

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

//online users
const onlineUsers = new Set();

io.on("connection", async (socket) => {
  console.log("User connected", socket.id);

  const token = socket.handshake.auth.token;
  //cuurent user details
  const user = await getUserDetailsByToken(token);

  //join room
  socket.join(user?._id.toString());

  onlineUsers.add(user?._id.toString());
  const activeFriends = Array.from(onlineUsers).map((userId) => {
    return user?.savedFriends.includes(userId) ? userId : null;
  });
  io.emit("onlineUsers", activeFriends);

  socket.on("message-page", async (data) => {
    const participant = await User.findOne({ _id: data?.userId }).select(
      "-password -__v -createdAt -updatedAt -savedContacts -savedFriends -emailVerified"
    );
    // console.log("Participant", participant);
    const payload = {
      _id: participant?._id,
      name: participant?.name,
      email: participant?.email,
      profilePicture: participant?.profilePicture,
      mobile: participant?.mobile,
      onlineStatus: onlineUsers.has(data?.userId),
    };

    socket.emit("message-participant", payload);
  });

  //get recent chats
  socket.on("recent-chats", async (data) => {
    try {
      const recentChats = await getRecentChats(user?._id);
      socket.emit("recent-chats", recentChats);
    } catch (error) {
      console.log("Error", error);
      socket.emit("message", {
        error: "Something went wrong, please try again later",
      });
    }
  });

  //get conversation
  socket.on("get-conversation", async (data) => {
    try {
      if (!data?.senderId || !data?.receiverId) {
        return socket.emit("message", {
          error: "Please provide senderId and receiverId",
        });
      }
      let conversation = await Conversation.findOne({
        $or: [
          { sender: data?.senderId, receiver: data?.receiverId },
          { sender: data?.receiverId, receiver: data?.senderId },
        ],
      })
        .populate("messages")
        .sort({ updateAt: -1 });
      if (!conversation) {
        conversation = await Conversation.create({
          sender: data?.senderId,
          receiver: data?.receiverId,
        });
      }
      const getConversation = await Conversation.findOne({
        _id: conversation?._id,
      })
        .populate("messages")
        .sort({ updateAt: -1 });

        socket.emit("message", getConversation.messages);
    } catch (error) {
      console.log("Error", error);
      socket.emit("message", {
        error: "Something went wrong, please try again later",
      });
    }
  });

  //new message
  socket.on("new-message", async (data) => {
    try {
      //check available conversation
      // console.log("New message", data);
      let conversation = await Conversation.findOne({
        $or: [
          { sender: data?.senderId, receiver: data?.receiverId },
          { sender: data?.receiverId, receiver: data?.senderId },
        ],
      });
      if (!conversation) {
        const newConversation = await Conversation.create({
          sender: data?.senderId,
          receiver: data?.receiverId,
        });
        conversation = await newConversation.save();
      }
      const message = await Message.create({
        text: data?.text,
        sender: data?.senderId,
      });
      const updatConversation = await Conversation.updateOne(
        {
          _id: conversation?._id,
        },
        {
          $push: { messages: message?._id },
        }
      );

      const getConversation = await Conversation.findOne({
        _id: conversation?._id,
      })
        .populate("messages")
        .sort({ updateAt: -1 });

      const recentChatsSender = await getRecentChats(data?.senderId);
      const recentChatsReceiver = await getRecentChats(data?.receiverId);

      io.to(data?.receiverId).emit("message", getConversation.messages);
      io.to(data?.senderId).emit("message", getConversation.messages);

      io.to(data?.receiverId).emit("recent-chats", recentChatsReceiver);
      io.to(data?.senderId).emit("recent-chats", recentChatsSender);
    } catch (error) {
      console.log("Error", error);
      socket.emit("message", {
        error: "Something went wrong, please try again later",
      });
    }
  });

  //

  // disconnect
  socket.on("disconnect", () => {
    onlineUsers.delete(user?._id);
    console.log("User disconnected", socket.id);
  });
});

module.exports = { app, server };
