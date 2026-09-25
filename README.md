# Binance Pay Frontend

A modern, enterprise-grade frontend interface for the **Binance Pay** crypto payment gateway. Built to provide a seamless, highly optimized experience for managing crypto payments, API keys, webhooks, and monitoring transactions.

## 🚀 Features

- **Real-time Dashboard:** Monitor transactions, available balance, and API metrics.
- **Enterprise UI/UX:** Clean, dark-mode focused, modern design powered by Tailwind CSS.
- **Secure Authentication:** JWT & OAuth based protected routes.
- **Developer First:** Built-in API documentation and webhook monitoring pages.
- **Highly Optimized:** Fast loading speeds, smooth scrolling, and optimized React components.

## 🛠️ Tech Stack

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Data Fetching:** React Query & Axios
- **Icons:** Lucide React
- **Animations:** Framer Motion & Lenis (Smooth Scrolling)
- **Configuration:** Craco (Create React App Configuration Override)

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Node.js** (v16.x or higher)
- **npm** or **yarn**

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd binance-pay/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root of the frontend directory:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```
   *(Update the backend URL if your API is hosted elsewhere)*

4. **Start Development Server**
   ```bash
   npm start
   ```
   The application will start running on [http://localhost:3000](http://localhost:3000).

## 🔨 Build for Production

To create an optimized production build, run:

```bash
npm run build
```
This command compiles the React code and outputs the minified production-ready files into the `build/` directory. You can easily deploy this folder to Vercel, Netlify, AWS S3, or any static hosting service.

## 🗂️ Project Structure

```
frontend/
├── public/              # Static assets (index.html, favicon.svg)
├── src/                 
│   ├── components/      # Reusable UI components (Navbar, ProtectedRoute)
│   ├── context/         # Global React context (AuthContext)
│   ├── pages/           # Application views (Dashboard, Checkout, Login)
│   ├── App.js           # Main landing page component
│   └── index.js         # Entry point & React Router configuration
├── craco.config.js      # Webpack overrides
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📜 License

This project is licensed under the MIT License.
