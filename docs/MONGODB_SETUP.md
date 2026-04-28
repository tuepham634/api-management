# Hướng dẫn cài đặt MongoDB

## 1. Cài đặt MongoDB

### Windows:
1. Tải MongoDB Community Server từ: https://www.mongodb.com/try/download/community
2. Chạy file cài đặt và làm theo hướng dẫn
3. Chọn "Complete" installation
4. Chọn "Install MongoDB as a Service"

### macOS (dùng Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian):
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 2. Kiểm tra MongoDB đang chạy

```bash
# Kiểm tra service
mongosh

# Hoặc
mongo
```

## 3. Tạo Database (Tùy chọn)

MongoDB sẽ tự động tạo database khi bạn chạy ứng dụng lần đầu.

Nếu muốn tạo thủ công:
```bash
mongosh
use api-management
```

## 4. Cấu hình Connection String

Trong file `.env`:
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/api-management

# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/api-management?retryWrites=true&w=majority
```

## 5. Sử dụng MongoDB Atlas (Cloud - Miễn phí)

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Đăng ký tài khoản miễn phí
3. Tạo cluster mới (chọn Free tier)
4. Tạo database user
5. Whitelist IP address (hoặc cho phép tất cả: 0.0.0.0/0)
6. Lấy connection string và cập nhật vào `.env`

## 6. MongoDB Compass (GUI Tool)

Tải MongoDB Compass để quản lý database bằng giao diện:
https://www.mongodb.com/products/compass

Connection string: `mongodb://localhost:27017`

## 7. Các lệnh MongoDB hữu ích

```bash
# Xem tất cả databases
show dbs

# Chọn database
use api-management

# Xem collections
show collections

# Xem tất cả users
db.users.find()

# Xem users với format đẹp
db.users.find().pretty()

# Đếm số users
db.users.countDocuments()

# Xóa tất cả users
db.users.deleteMany({})

# Xóa database
db.dropDatabase()
```

## 8. Troubleshooting

### Lỗi: "MongoServerError: Authentication failed"
- Kiểm tra username/password trong connection string
- Đảm bảo user đã được tạo trong MongoDB

### Lỗi: "MongooseServerSelectionError: connect ECONNREFUSED"
- Kiểm tra MongoDB service đang chạy
- Kiểm tra connection string trong `.env`
- Kiểm tra firewall/port 27017

### Lỗi: "MongoParseError: Invalid connection string"
- Kiểm tra format của MONGODB_URI
- Đảm bảo không có khoảng trắng thừa
