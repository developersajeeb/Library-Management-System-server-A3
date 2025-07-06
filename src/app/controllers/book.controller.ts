import { Request, Response, Router } from 'express';
import { Book } from '../models/book.model';

export const bookRoutes = Router();

bookRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern?.isbn) {
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
});

// /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
bookRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const filterGenre = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || 'createdAt';
    const sortOrder = (req.query.sort as string) === 'asc' ? 1 : -1;
    const limit = Number(req.query.limit) || 10;

    const filter: any = {};
    if (filterGenre) filter.genre = filterGenre;

    const books = await Book.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books',
      error
    });
  }
});

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve book',
      error
    });
  }
});

bookRoutes.put('/:bookId', async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true, runValidators: true }
    );

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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update book',
      error
    });
  }
});

bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.bookId);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error
    });
  }
});