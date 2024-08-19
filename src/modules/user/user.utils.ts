import { Customer } from '../customer/customer.model';
import { User } from './user.model';

export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateAdminId = async () => {
  const lastAdmin = await findLastAdminId();
  let currentId = 0;
  if (lastAdmin) currentId = Number(lastAdmin.substring(2));

  const generatedId = `A-${(currentId + 1).toString().padStart(4, '0')}`;

  return generatedId;
};

export const findLastCustomerId = async () => {
  const lastCustomer = await User.findOne(
    {
      role: 'customer',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastCustomer?.id ? lastCustomer.id : undefined;
};

export const generateCustomerId = async () => {
  const lastCustomer = await findLastCustomerId();
  const lastCustomerIdSerial = lastCustomer ? Number(lastCustomer.slice(8)) : 0;

  const currentCustomerSerial = lastCustomerIdSerial + 1;
  const currentCustomerSerialString = String(currentCustomerSerial).padStart(
    6,
    '0',
  );

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const date = String(currentDate.getDate()).padStart(2, '0');

  const generatedId = `${year}${month}${date}${currentCustomerSerialString}`;

  return generatedId;
};
