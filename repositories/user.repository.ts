import { User, IUser } from '../models/user.model';

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const createUser = async (userData: {
  email: string;
  password: string;
  name: string;
}): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

export const updateUser = async (
  id: string,
  updates: Partial<IUser>
): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  );
};

export const findUserByResetToken = async (token: string): Promise<IUser | null> => {
  return await User.findOne({ 
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() }
  });
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export const getAllUsers = async (
  limit: number = 10,
  skip: number = 0
): Promise<IUser[]> => {
  return await User.find()
    .select('-password')
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
};

export const countUsers = async (): Promise<number> => {
  return await User.countDocuments();
};
