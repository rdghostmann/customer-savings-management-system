import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Customer name is required'],
      trim: true 
    },
    accountNumber: { 
      type: String, 
      required: [true, 'Account number is required'],
      unique: true,
      trim: true 
    },
    phone: { 
      type: String, 
      required: [true, 'Phone number is required'],
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    address: { 
      type: String, 
      trim: true 
    },
    balance: { 
      type: Number, 
      default: 0 
    },
    joinDate: { 
      type: Date, 
      default: Date.now 
    },
    lastActivity: { 
      type: Date, 
      default: Date.now 
    },
    status: { 
      type: String, 
      enum: ['active', 'inactive', 'suspended'],
      default: 'active' 
    }
  },
  { 
    timestamps: true,
  }
);

const Customer = mongoose.models?.Customer || mongoose.model('Customer', CustomerSchema);
export default Customer;