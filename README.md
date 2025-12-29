# Anony-mous 🎭

An anonymous confession and chat application where users can share their thoughts freely without revealing their identity. Built with React and Node.js.

## ✨ Features

- **Anonymous Posting**: Share confessions without revealing your identity
- **User Authentication**: Secure signup and login system
- **Feed System**: Browse all confessions in a clean, card-based interface
- **Post Details**: View individual confessions with full details
- **Anonymous Aliases**: Automatic generation of anonymous usernames
- **Protected Routes**: Secure pages that require authentication
- **Responsive Design**: Beautiful UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication (planned)
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
my-react-app/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   └── authController.js  # Authentication logic
│   ├── middlewares/
│   │   └── authMiddleware.js  # JWT verification
│   ├── routes/
│   │   └── authRoutes.js      # API routes
│   ├── server.js              # Express server setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ConfessionCard.jsx    # Confession display card
    │   │   ├── LeftSidebar.jsx       # Navigation sidebar
    │   │   ├── Navbar.jsx            # Top navigation
    │   │   └── ProtectedRoute.jsx    # Route protection
    │   ├── pages/
    │   │   ├── Create.jsx            # Create confession
    │   │   ├── Feed.jsx              # Main feed
    │   │   ├── PostDetail.jsx        # Single post view
    │   │   ├── SignIn.jsx            # Login page
    │   │   └── SignUp.jsx            # Registration page
    │   ├── context/
    │   │   └── PostContext.jsx       # Global state
    │   ├── services/
    │   │   └── api.js                # API calls
    │   ├── utils/
    │   │   └── generateAlias.js      # Anonymous name generator
    │   ├── App.jsx                   # Main app component
    │   └── main.jsx                  # Entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ANUBHAVSINGH30/Anony-mous.git
   cd Anony-mous
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Start the backend server:
   ```bash
   npm start
   ```
   Server will run on `http://localhost:8000`

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

   Create a `.env` file in the frontend directory (if needed):
   ```env
   VITE_API_URL=http://localhost:8000
   ```

   Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your account
3. **Create Confession**: Share your thoughts anonymously
4. **Browse Feed**: View confessions from other anonymous users
5. **View Details**: Click on any confession to see full details

## 🔐 Environment Variables

### Backend (.env)
```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/anonymous-chat
JWT_SECRET=your_secret_key_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Posts (Coming Soon)
- `GET /api/posts` - Get all confessions
- `POST /api/posts` - Create new confession
- `GET /api/posts/:id` - Get single confession
- `DELETE /api/posts/:id` - Delete confession

## 🚧 Development Status

- ✅ Basic project structure
- ✅ Authentication UI (SignIn/SignUp)
- ✅ Feed and Post components
- ✅ Anonymous alias generator
- ✅ Protected routes
- 🔄 Backend API integration (in progress)
- 🔄 Database models (in progress)
- ⏳ Comment system (planned)
- ⏳ Like/React system (planned)
- ⏳ Real-time updates (planned)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Anubhav Singh**
- GitHub: [@ANUBHAVSINGH30](https://github.com/ANUBHAVSINGH30)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for beautiful styling utilities
- Express.js for the robust backend framework

---

⭐ Star this repo if you find it helpful!
