
# 📚 Library Management System API

A RESTful API for managing books and borrowing records using **Express**, **TypeScript**, and **MongoDB with Mongoose**.
API Live Link: [Library Management](#)  
---

## 🚀 Features

- Add, update, delete, and view books
- Filter, sort, and limit books
- Borrow books with validation and business logic
- Auto update book availability
- Aggregation summary of borrowed books

---

## ⚙️ Tech Stack

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose

---

## 🛠️ Project Setup

```bash
git clone https://github.com/developersajeeb/Library-Management-System-server-A3
cd Library-Management-System-server-A3
npm install
npm run dev
```

---

## 🌐 Base URL

```
http://localhost:5000/
```

---

## 📘 Book APIs

### 🔹 Create a Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

📍 **URL:** `http://localhost:5000/api/books`

---

### 🔹 Get All Books

**GET** `/api/books`

📍 **URL:** `http://localhost:5000/api/books`

---

### 🔹 Filter, Sort, Limit Books

**GET** `/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

📍 **URL:**  
`http://localhost:5000/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`

---

### 🔹 Get Book by ID

**GET** `/api/books/:bookId`

📍 **Example URL:**  
`http://localhost:5000/api/books/6856cb3371681b36eb1e57a6`

---

### 🔹 Update Book by ID

**PUT** `/api/books/:bookId`

```json
{
  "copies": 10
}
```

📍 **Example URL:**  
`http://localhost:5000/api/books/6856cb3371681b36eb1e57a6`

---

### 🔹 Delete Book by ID

**DELETE** `/api/books/:bookId`

📍 **Example URL:**  
`http://localhost:5000/api/books/6856db3d2fd9e2f82c50a9dd`

---

## 📗 Borrow APIs

### 🔹 Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "6856cb3371681b36eb1e57a6",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

📍 **URL:** `http://localhost:5000/api/borrow`

✅ **Business Logic:**

- Verifies book availability
- Deducts copies from the book
- Updates `available` field if copies become 0

---

### 🔹 Borrowed Books Summary (Aggregation)

**GET** `/api/borrow`

📍 **URL:** `http://localhost:5000/api/borrow`

📊 **Returns:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## ✅ Validation Rules

- **Title, Author, Genre, ISBN, Copies** — required
- **Genre** must be one of:
  - FICTION
  - NON_FICTION
  - SCIENCE
  - HISTORY
  - BIOGRAPHY
  - FANTASY
- **ISBN** must be unique
- **Copies** must be ≥ 0
- **Borrow quantity** must be ≥ 1 and not exceed available copies

---

## 🧪 Testing Endpoints

You can use **Postman** or **Insomnia** with the following URLs:

| Action                   | Method | URL                                                                 |
|--------------------------|--------|----------------------------------------------------------------------|
| Save a Book              | POST   | http://localhost:5000/api/books                                      |
| Get All Books            | GET    | http://localhost:5000/api/books                                      |
| Filter Books             | GET    | http://localhost:5000/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5 |
| Get Single Book          | GET    | http://localhost:5000/api/books/6856cb3371681b36eb1e57a6             |
| Update Book              | PUT    | http://localhost:5000/api/books/6856cb3371681b36eb1e57a6             |
| Delete Book              | DELETE | http://localhost:5000/api/books/6856db3d2fd9e2f82c50a9dd             |
| Borrow a Book            | POST   | http://localhost:5000/api/borrow                                     |
| Borrow Summary           | GET    | http://localhost:5000/api/borrow                                     |

---

## 📹 Video Demo

🎥 [Attach your video link here before submission]

---

## 📁 Folder Structure

```
src/
├── controllers/
│   ├── book.controller.ts
│   └── borrow.controller.ts
├── interfaces/
│   ├── book.interface.ts
│   └── borrow.interface.ts
├── models/
│   ├── book.model.ts
│   └── borrow.model.ts
app.ts
server.ts
```

---

## 🧑‍💻 Developer

Sajeeb  
🌐 [www.developersajeeb.com](http://www.developersajeeb.com)  
📞 +8801743370840