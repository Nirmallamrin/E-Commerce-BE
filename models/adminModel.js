import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: [true,'Please enter an email'],
        unique:true,
        lowercase:true
    },
    hashPassword: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
      type: String,
      default: 'admin',
      enum: ['admin']
    }
  }, { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema)

export default Admin;