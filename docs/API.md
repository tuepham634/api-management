# API Documentation

## Base URL
```
http://localhost:3000/api/auth
```

## Endpoints

### 1. Đăng ký (Register)
**POST** `/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Nguyen Van A"
}
```

**Response Success (201):**
```json
{
  "message": "Đăng ký thành công",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. Đăng nhập (Login)
**POST** `/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "message": "Đăng nhập thành công",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Lưu accessToken để sử dụng cho các request tiếp theo!**

---

### 3. Lấy thông tin profile (Get Profile)
**GET** `/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response Success (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "Nguyen Van A",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Quên mật khẩu (Forgot Password)
**POST** `/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response Success (200):**
```json
{
  "message": "Nếu email tồn tại, link reset mật khẩu đã được gửi",
  "resetToken": "abc123xyz789"
}
```

---

### 5. Reset mật khẩu (Reset Password)
**POST** `/reset-password`

**Request Body:**
```json
{
  "token": "abc123xyz789",
  "newPassword": "newpassword123"
}
```

**Response Success (200):**
```json
{
  "message": "Đổi mật khẩu thành công"
}
```

---

### 6. Đổi mật khẩu (Change Password)
**POST** `/change-password`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

**Response Success (200):**
```json
{
  "message": "Đổi mật khẩu thành công"
}
```

---

## Error Responses

**400 Bad Request:**
```json
{
  "message": "Vui lòng điền đầy đủ thông tin"
}
```

**401 Unauthorized:**
```json
{
  "message": "Token không hợp lệ hoặc đã hết hạn"
}
```

**404 Not Found:**
```json
{
  "message": "Người dùng không tồn tại"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Lỗi server"
}
```
