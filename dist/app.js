"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors({
    origin: ["https://edushelf-nu.vercel.app", "http://localhost:5173"]
}));
app.use(express_1.default.json());
app.use('/api/books', book_controller_1.bookRoutes);
app.use('/api/borrow', borrow_controller_1.borrowRoutes);
app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>Library Management App Api</title>
      </head>
      <body style="padding: 20px; margin: 0">
        <div style="background-color: #f2f2f2; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; border-radius: 20px">
            <h1 style="font-family: sans-serif;">📚 Library Management</h1>
        </div>
      </body>
    </html>
  `);
});
exports.default = app;
