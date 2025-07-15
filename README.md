# 🧠 Mental Health & Well-being App

A comprehensive mental health support application designed to help users track their emotional well-being, practice mindfulness, and access helpful resources during their academic journey.

## ✨ Features

- **Daily Check-ins** 😊 - Track your mood and reflect on your day
- **Journaling** ✍️ - Express your thoughts and feelings privately with rich text editing
- **Breathing Exercises** 🧘 - Practice guided mindful breathing to calm your mind
- **Resource Library** 📚 - Access helpful articles, exercises, and support materials
- **User Authentication** 🔐 - Secure Firebase authentication
- **Responsive Design** 📱 - Beautiful UI that works on all devices

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Charts**: Recharts for mood tracking visualization
- **Rich Text Editor**: React Quill for journaling
- **Deployment**: Ready for Vercel/Netlify

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Firebase account (for authentication and database)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my-mental-health-app.git
   cd my-mental-health-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config

4. **Environment Setup**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📱 Usage

1. **Sign Up/Login** - Create an account or log in with existing credentials
2. **Daily Check-in** - Start your day by tracking your mood and energy levels
3. **Journal** - Write about your thoughts, experiences, and reflections
4. **Breathing Exercise** - Take a moment to practice mindful breathing
5. **Explore Resources** - Browse helpful articles and mental health resources

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FeatureCard.jsx
│   ├── Header.jsx
│   ├── Logo.jsx
│   └── ...
├── pages/              # Main application pages
│   ├── HomePage.jsx
│   ├── AuthPage.jsx
│   ├── CheckInPage.jsx
│   ├── JournalPage.jsx
│   └── ...
├── assets/            # Images and static assets
├── firebase.js        # Firebase configuration
├── App.jsx           # Main application component
└── main.jsx          # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌈 Customization

The app uses Tailwind CSS with custom brand colors:
- Primary Blue: `text-brand-blue`
- Dark Text: `text-brand-black`
- Custom font: Montserrat

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you're experiencing a mental health crisis, please reach out to:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

## 🙏 Acknowledgments

- Built with care for student mental health and well-being
- Inspired by the need for accessible mental health tools
- Thanks to the open-source community for the amazing tools and libraries

---

**Remember**: This app is a tool to support your mental health journey, but it's not a substitute for professional help. Please reach out to mental health professionals when needed.
