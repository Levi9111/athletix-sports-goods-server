import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';

export type TCustomerName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TCustomer = {
  id: string;
  user: Types.ObjectId;
  name: TCustomerName;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  shippingAddress: string;
  billingAddress?: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface CustomerModel extends Model<TCustomer> {
  isUserExists(id: string): Promise<TCustomer | null>;
}
