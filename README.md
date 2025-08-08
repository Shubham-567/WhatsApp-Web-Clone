# WhatsApp Web Clone

A simple web application that mimics the WhatsApp Web layout and basic features.  
The project has a **Node.js + Express** backend with **MongoDB** for storing messages, and a **React** frontend for the interface.

- **Live Demo:** [https://web-chat-site.vercel.app](https://web-chat-site.vercel.app)

---

## 🛠 Tech Stack

**Frontend**

- React
- Zustand (state management)
- Axios (API calls)
- TailwindCSS (styling)
- Lucide (icons)

**Backend**

- Node.js
- Express
- MongoDB + Mongoose
- dotenv
- cors

---

## 📁 Project Structure

```
Backend/
│
├── config/                   # Database connection config
├── controllers/              # API logic for messages
├── models/                   # Mongoose schemas
├── routes/                   # API routes
├── scripts/                  # Payload processing scripts
├── whatsapp_sample_payloads/ # Sample webhook JSON payloads
└── server.js                 # Express app entry point

Frontend/
└── src/
    ├── components/   # React UI components
    ├── pages/        # Page-level components
    ├── services/     # Base API
    ├── store/        # Zustand store
    ├── utils/        # Utility functions
    ├── index.css     # Global styles
    └── App.jsx       # Main React app component
```

---

## 🚀 Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Shubham-567/WhatsApp-Web-Clone.git
cd WhatsApp-Web-Clone
```

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
```

Run the backend server:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a .env file in frontend:

```
VITE_API_URL=http://localhost:5000/api
```

Run the app:

```
npm run dev
```

The frontend will run at [http://localhost:5173](http://localhost:5173) (Vite default).

---

## 🧪 Processing Sample Payloads

The backend includes a script to process sample WhatsApp webhook JSON files from the `whatsapp_sample_payloads` folder — simulating receiving messages and status updates.

**Run it:**

```bash
cd Backend
node scripts/processPayloads.js
```

**What it does:**

- Reads all `.json` files in `whatsapp_sample_payloads`.
- Inserts new messages into the `processed_messages` collection.
- Updates message statuses when matching `meta_msg_id` is found.

---

## 📡 API Endpoints

**Base URL:**  
`http://localhost:5000/api`

### Get all conversations

```http
GET /conversations
```

Returns a list of chats with:

- contact name
- last message
- last sender
- timestamp

---

### Get messages by contact

```http
GET /messages/:wa_id
```

Returns all messages for the given contact.

---

### Send message

```http
POST /messages/:wa_id
Content-Type: application/json

{
  "text": "Hello",
  "name": "You"
}
```

Send a new outgoing message.

---

## 📌 Development Notes

📜 License
This project is licensed under the MIT License.
