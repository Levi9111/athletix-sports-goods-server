import { Schema, model } from 'mongoose';
import { AdminModel, TAdmin, TAdminName } from './admin.interface';

const adminNameSchema = new Schema<TAdminName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [14, 'Name can not exceed 14 characters'],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [14, 'Middle Name can not exceed 14 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [14, 'Name can not exceed 14 characters'],
  },
});

const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: {
      type: adminNameSchema,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },

    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact No is required'] },
    address: {
      type: String,
      required: [true, 'Shipping Address is required'],
    },
    profileImg: { type: String },
    isDeleted: { type: Boolean, default: false },
  },

  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

adminSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: {
        $ne: true,
      },
    },
  });
  next();
});

adminSchema.statics.isUserExists = async function (id: string) {
  const exisitingUser = await Admin.findOne({ id });
  return exisitingUser;
};

export const Admin = model<TAdmin, AdminModel>('Admin', adminSchema);
