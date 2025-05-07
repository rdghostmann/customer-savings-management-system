import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: [true, 'Username is required'],
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
    password: { 
      type: String, 
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false // Don't return password by default
    },
    role: { 
      type: String, 
      enum: ['admin', 'manager', 'staff'],
      default: 'staff' 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
    lastLogin: { 
      type: Date 
    }
  },
  { timestamps: true }
);


const User = mongoose.models?.User || mongoose.model('User', UserSchema);
export default User;