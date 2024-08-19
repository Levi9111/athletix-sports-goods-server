import { Schema, model } from 'mongoose';
import { CustomerModel, TCustomer, TCustomerName } from './customer.interface';

const customerNameSchema = new Schema<TCustomerName>({
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

const customerSchema = new Schema<TCustomer>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    name: {
      type: customerNameSchema,
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
    shippingAddress: {
      type: String,
      required: [true, 'Shipping Address is required'],
    },
    billingAddress: { type: String },
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

customerSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

customerSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

customerSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

customerSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      isDeleted: {
        $ne: true,
      },
    },
  });
  next();
});

customerSchema.statics.isUserExists = async function (id: string) {
  const exisitingUser = await Customer.findOne({ id });
  return exisitingUser;
};

export const Customer = model<TCustomer, CustomerModel>(
  'Customer',
  customerSchema,
);
