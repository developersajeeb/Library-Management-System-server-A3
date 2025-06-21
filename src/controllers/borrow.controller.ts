import { Router, Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';

export const borrowRoutes = Router();

borrowRoutes.post('/', async (req: Request, res: Response) => {
  try {
    const borrow = new Borrow(req.body);
    await borrow.save();

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to borrow book',
      error
    });
  }
});

borrowRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $unwind: '$bookDetails'
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn'
          },
          totalQuantity: 1
        }
      }
    ]);

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve borrowed summary',
      error
    });
  }
});
