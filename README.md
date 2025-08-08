# WhatsApp Web Clone

A simple web application that mimics the WhatsApp Web layout and basic features.  
The project has a **Node.js + Express** backend with **MongoDB** for storing messages, and a **React** frontend for the interface.

---

## ✨ Features

- 📂 Sidebar with chat list.
- 💬 Chat window to view and send messages.
- 📝 Displays last message and last sender for each conversation.
- 🗄️ Stores incoming and outgoing messages in MongoDB.
- 📡 Updates message status (**sent**, **delivered**, **read**) based on status payloads.
- 🧪 Processes sample WhatsApp webhook payloads from local JSON files for testing.

---

## 🛠 Tech Stack

**Frontend**
- React
- Zustand (state management)
- Axios (API calls)
- TailwindCSS (styling)

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
├── config/ # Database connection config
├── controllers/ # API logic for messages
├── models/ # Mongoose schemas
├── routes/ # API routes
├── scripts/ # Payload processing scripts
├── whatsapp_sample_payloads/ # Sample webhook JSON payloads
└── server.js # Express app entry point

Frontend/
│
├── src/components/ # React UI components
├── src/store/ # Zustand store
├── src/index.css # Global styles
└── src/main.jsx # React entry point

```
---

## 🚀 Setup

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd WhatsApp-Web-Clone
```

### 2️⃣ Backend Setup
```
cd Backend
npm install
```
Create a .env file:

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
```

Run the backend server:

```
npm start
```

### 3️⃣ Frontend Setup

```
cd ../Frontend
npm install
npm run dev
```

The frontend will run at http://localhost:5173 (Vite default).

### 🧪 Processing Sample Payloads
The backend includes a script to process sample WhatsApp webhook JSON files from the
whatsapp_sample_payloads folder — simulating receiving messages and status updates.

Run it:

```
cd Backend
node scripts/payloadProcessor.js
```

What it does:

Reads all .json files in whatsapp_sample_payloads.

Inserts new messages into the processed_messages collection.

Updates message statuses when matching meta_msg_id is found.

### 📡 API Endpoints
Base URL:
``` http://localhost:5000/api ```

``` Get all conversations ```

``` GET /conversations ```
Returns a list of chats with:

contact name

last message

last sender

timestamp

Get messages by contact
http
Copy
Edit
GET /messages/:wa_id
Returns all messages for the given contact.

Send message
http
Copy
Edit
POST /messages/:wa_id
Content-Type: application/json

{
  "text": "Hello",
  "name": "You"
}
Adds a new outgoing message.

📌 Development Notes
The payload processor is manual for now — it only processes local JSON files for testing.

In production, this logic would live in a webhook endpoint to process real-time WhatsApp API requests.

Profile images in the chat list use UI Avatars.

📜 License
This project is licensed under the MIT License.
