# API Management - Express.js với TypeScript & MongoDB

Dự án API quản lý người dùng với các tính năng đăng ký, đăng nhập, quản lý profile, quên mật khẩu và đổi mật khẩu sử dụng MongoDB.

## 📁 Cấu trúc dự án

```
├── config/              # Cấu hình ứng dụng (database, env)
├── controllers/         # Controllers xử lý request/response
├── docs/               # Tài liệu API
├── helpers/            # Helper functions (JWT, etc.)
├── middlewares/        # Middleware (authentication, etc.)
├── models/             # Mongoose models và schemas
├── repositories/       # Data access layer
├── routers/            # Route definitions
├── services/           # Business logic
├── utils/              # Utility functions
├── validations/        # Request validation
├── .env                # Environment variables
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore file
├── nodemon.json        # Nodemon configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript configuration
```

## 🚀 Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd api-management
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cài đặt MongoDB:
Xem hướng dẫn chi tiết tại [docs/MONGODB_SETUP.md](docs/MONGODB_SETUP.md)

4. Cấu hình file `.env`:
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
MONGODB_URI=mongodb://localhost:27017/api-management
NODE_ENV=development
```

## 💻 Chạy ứng dụng

### Development mode (với nodemon):
```bash
npm run dev
```

### Build và chạy production:
```bash
npm run build
npm start
```

## 📚 API Endpoints

### Public Routes

#### 1. Đăng ký
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "Nguyen Van A"
}
```

#### 2. Đăng nhập
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 3. Quên mật khẩu
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### 4. Reset mật khẩu
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-here",
  "newPassword": "newpassword123"
}
```

### Protected Routes (cần token)

#### 5. Lấy thông tin profile
```http
GET /api/auth/profile
Authorization: Bearer <your-jwt-token>
```

#### 6. Đổi mật khẩu
```http
POST /api/auth/change-password
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

## 🔧 Scripts

- `npm run dev` - Chạy development server với nodemon
- `npm run build` - Build TypeScript sang JavaScript
- `npm start` - Chạy production server

## 📖 Tài liệu chi tiết

- [API Documentation](docs/API.md)
- [MongoDB Setup Guide](docs/MONGODB_SETUP.md)

## 🛠️ Technologies

- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL Database
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - CORS middleware
- **uuid** - Generate unique IDs

## 📝 Database Schema

### User Model
```typescript
{
  email: String (unique, required)
  password: String (required, hashed)
  name: String (required)
  resetToken: String (optional)
  resetTokenExpiry: Date (optional)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## 🔐 Bảo mật

- Mật khẩu được hash bằng bcrypt với salt rounds = 10
- JWT token được sử dụng cho authentication
- Validation được thực hiện ở tầng middleware
- Protected routes yêu cầu JWT token hợp lệ
- Reset token có thời gian hết hạn (1 giờ)
- Email validation với regex pattern
- Password minimum length: 6 ký tự

## 🧪 Test API với cURL

### Đăng ký:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'
```

### Đăng nhập:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

### Lấy profile:
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📄 License

ISC
