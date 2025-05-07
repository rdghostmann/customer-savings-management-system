import mongoose from 'mongoose';


const TransactionSchema = new mongoose.Schema(
  {
    customer: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer reference is required'] 
    },
    type: { 
      type: String, 
      enum: ['credit', 'debit'],
      required: [true, 'Transaction type is required'] 
    },
    amount: { 
      type: Number, 
      required: [true, 'Transaction amount is required'],
      validate: {
        validator: function(value) {
          return value > 0;
        },
        message: 'Amount must be positive'
      }
    },
    balance: { 
      type: Number, 
      required: [true, 'Balance after transaction is required'] 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
    description: { 
      type: String, 
      trim: true 
    },
    createdBy: { 
      type: String, 
      required: [true, 'User who created the transaction is required'] 
    }
  },
  { timestamps: true }
);

// Indexes for faster queries
TransactionSchema.index({ customer: 1, date: -1 });
TransactionSchema.index({ type: 1 });
TransactionSchema.index({ date: 1 });

const Transaction = mongoose.models?.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;