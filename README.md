
# 🔗 URL Shortener

This project helps you **generate short URLs** quickly and easily — like a mini Bitly!  
Built with **Node.js, Express.js, MongoDB, EJS**.

---

## 🚀 Live Demo

[![Live App](https://img.shields.io/badge/Live%20App-Click%20Here-green?style=for-the-badge)](https://testurlshortner.up.railway.app)

🔗 https://testurlshortner.up.railway.app

---

## 📂 Project Structure

```
urlShortner/
├── .github/workflows   # GitHub Actions workflow files
├── controller/         # Business logic
├── model/              # Mongoose models
├── public/             # Static files (CSS, JS, images)
├── routes/             # Express routes
├── views/              # EJS frontend views
├── .env.example        # Environment variables sample
├── index.js            # Entry point
```

---

## ⚙️ Features

- 🔗 Shortens any valid URL
- 📊 Tracks click counts (optional future feature)
- 🌐 Clean UI using EJS
- 🨠 Modular code structure
- ☁️ Deployed on Railway

---

## 🧪 How to Run Locally
### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/urlShortner.git
cd urlShortner
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
- Create a `.env` file using `.env.example`
- Set your MongoDB URI and BASE URL.

```env
MONGO_URI=your_mongodb_connection_string
BASE_URL=https://testurlshortner.up.railway.app
```

#### 💡 What is BASE_URL?
`BASE_URL` is the root domain used when generating short links.

| Environment           | BASE_URL                                |
|----------------------|------------------------------------------|
| Local Development     | http://localhost:5000                   |
| Deployed on Railway   | https://testurlshortner.up.railway.app  |

So your short URL would look like:
```
https://testurlshortner.up.railway.app/abc123
```

### 4. Start the Server
```bash
npm start
```


## 🌍 Deployment

Deployed on **Railway**. Automatic redeployment on every push to `master`.

---

✨ Happy shortening!

