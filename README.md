

---

# ✅ Todo App with Categories - Node.js, Express & MongoDB

Welcome to **Day 4** of my **10 Days of Node.js/Express/MongoDB** series!

This app lets users create **categories** and **add todos under each category**. It uses **MongoDB referencing**, supports **JWT authentication**, and shows how to handle **one-to-many relationships** using Mongoose.

---

## 🚀 Features

- 🔐 User Authentication with JWT
- 🗂️ Create/Delete Categories
- 📝 Add Todos under specific categories
- ✅ Mark todos as done/undone
- 🧩 Populate categories in todos
- ☁️ MongoDB referencing with `ObjectId`

---

## 🧠 Technologies Used

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- dotenv
- bcryptjs (if extended for user auth)

---

## 📁 Folder Structure

```
todo-app/
├── models/
│   ├── Category.js
│   └── Todo.js
├── routes/
│   ├── categoryRoutes.js
│   └── todoRoutes.js
├── middleware/
│   └── authMiddleware.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 📦 Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/Y0GESHSHINDE/Day-4-Todo-App-with-Categories.git
cd Day-4-Todo-App-with-Categories
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file**
```
MONGO_URI=mongodb://127.0.0.1:27017/tododb
PORT=5000
JWT_SECRET=yourSecretKey
```

4. **Start the server**
```bash
npm run dev
```

App runs at:  
👉 `http://localhost:5000`

---

## 🔐 JWT Authentication

All routes are protected and require this header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📬 API Endpoints

### 📁 Category Routes

| Method | Endpoint             | Description                         |
|--------|----------------------|-------------------------------------|
| POST   | `/api/categories`    | Create a new category               |
| GET    | `/api/categories`    | Get all categories of the user      |
| DELETE | `/api/categories/:id`| Delete category + its todos         |

---

### 📝 Todo Routes

| Method | Endpoint           | Description                                      |
|--------|--------------------|--------------------------------------------------|
| POST   | `/api/todos`       | Create a todo under a category                  |
| GET    | `/api/todos`       | Get all todos of the user with populated category |
| PUT    | `/api/todos/:id`   | Update todo (`task` or `isDone`)                |
| DELETE | `/api/todos/:id`   | Delete a specific todo                          |

---

## 🧪 Sample JSON

**Create Todo**
```json
{
  "task": "Buy milk",
  "categoryId": "6614aa2df1e7fe3d5ef37d1f"
}
```

**Update Todo**
```json
{
  "task": "Buy eggs",
  "isDone": true
}
```

---

## 🧠 Learning Goal

This project demonstrates how to implement **one-to-many relationships in MongoDB**, using **referencing** and **populate()** to link and manage nested data effectively.

---

## 👨‍💻 Author

**Yogesh Shinde**  
📍 Manoli, Sangamner, Maharashtra  
📧 yogeshshinde3624@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/y0geshshinde)  
🐙 [GitHub](https://github.com/y0geshshinde)

---
