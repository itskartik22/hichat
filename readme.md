# HiChat

HiChat is a real-time chat application designed to provide an intuitive and seamless communication experience. Built with the MERN stack, it leverages modern technologies to support real-time messaging, live updates, and personalized features.

## Features

- **Real-time Messaging**: Send and receive messages instantly using Socket.IO.
- **Recent Chat Previews**: Display the latest messages for each contact.
- **Unread Message Counts**: Highlight unseen messages for active conversations.
- **Online Status Indicators**: Show live status updates of contacts.
- **Search Functionality**: Easily find and access conversations.

## Demo

![HiChat Interface](./client/public/Screenshot%202024-11-26%20131331.png)

## Tech Stack

- **Frontend**: React.js, Redux-RTK, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Real-time Communication**: Socket.IO
- **Database**: MongoDB with optimized queries using aggregation pipelines
- **Styling**: TailwindCSS for a modern and responsive UI

## Installation and Setup

Follow these steps to set up HiChat on your local machine:

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/itskartik22/hichat.git
   cd hichat
2. Install dependencies for both the frontend and backend:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
3.  Configure the environment variables:
    - Create a .env file in the server directory.
    - Add the following variables:
    ```bash
    PORT=5000
    NODE_ENV=development
    MONGODB_URI=
    MONGODB_PASSWORD=
    DB_NAME=hichat_db1
    CORS_ORIGIN=http://localhost:5173
    JWT_SECRET=  #you can add any secret string
    JWT_EXPIRES_IN=7d
4. Run the development servers:
    ```bash
    # Start backend
    cd server
    npm run dev

    # Start frontend
    cd ../client
    npm run dev
5. Open the application in your browser:
    ```bash
    http://localhost:5173

## Future Enhancements
- Group Chat functionality
- End-to-end encryption for secure communication
- Push notifications for message alerts
- File and media sharing within chats
## License
This project is licensed under the MIT License.

## Acknowledgments
- Socket.IO for real-time communication
- React for a robust frontend framework
- TailwindCSS for elegant and responsive design
- MongoDB for powerful database solutions
## Contact
For any queries or suggestions, feel free to contact me:

- Email: thakurkartik2262@gmail.com
- Portfolio: its-kartik-portfolio.netlify.app
- GitHub: @itskartik22
- LinkedIn: Kartik Kumar




