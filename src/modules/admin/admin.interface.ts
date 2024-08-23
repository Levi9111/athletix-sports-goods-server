import { Model, Types } from 'mongoose';
import { TGender } from '../../app/interface/utils';

export type TAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  address: string;
  profileImg?: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
