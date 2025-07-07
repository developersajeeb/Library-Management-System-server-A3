"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const book_model_1 = require("../models/book.model");
exports.bookRoutes = (0, express_1.Router)();
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const book = new book_model_1.Book(req.body);
        yield book.save();
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });
    }
    catch (error) {
        if (error.code === 11000 && ((_a = error.keyPattern) === null || _a === void 0 ? void 0 : _a.isbn)) {
            res.status(400).json({
                success: false,
                message: 'ISBN must be unique',
            });
        }
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            error: error
        });
    }
}));
// /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterGenre = req.query.filter;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;
        const limit = Number(req.query.limit) || 10;
        const filter = {};
        if (filterGenre)
            filter.genre = filterGenre;
        const books = yield book_model_1.Book.find(filter)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error
        });
    }
}));
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve book',
            error
        });
    }
}));
exports.bookRoutes.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update book',
            error
        });
    }
}));
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error
        });
    }
}));
