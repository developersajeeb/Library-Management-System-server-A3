import { Schema, model } from 'mongoose';
import { IBorrow } from '../interfaces/borrow.interface';
import { Book } from './book.model';

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true }
  },
  { timestamps: true }
);

borrowSchema.pre('save', async function (next) {
  const borrow = this;

  const book = await Book.findById(borrow.book);
  if (!book) {
    throw new Error('Book not found');
  }

  if (book.copies < borrow.quantity) {
    throw new Error('Not enough copies available');
  }

  book.copies -= borrow.quantity;
  book.available = book.copies > 0;
  await book.save();

  next();
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);