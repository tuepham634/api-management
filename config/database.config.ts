import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/api-management';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Kết nối MongoDB thành công');
  } catch (error) {
    console.error('Lỗi kết nối MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose đã kết nối tới MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Lỗi Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose đã ngắt kết nối');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose đã đóng kết nối do ứng dụng tắt');
  process.exit(0);
});
