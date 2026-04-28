# Test API với Postman hoặc cURL

## 1. Đăng ký người dùng mới

### cURL:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "name": "Nguyen Van A"
  }'
```

### Response:
```json
{
  "message": "Đăng ký thành công",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. Đăng nhập

### cURL:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Response:
```json
{
  "message": "Đăng nhập thành công",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Lưu accessToken để sử dụng cho các request tiếp theo!**

---

## 3. Lấy thông tin profile

### cURL:
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Response:
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "test@example.com",
    "name": "Nguyen Van A",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 4. Quên mật khẩu

### cURL:
```bash
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### Response:
```json
{
  "message": "Nếu email tồn tại, link reset mật khẩu đã được gửi",
  "resetToken": "abc123xyz789def456"
}
```

**Lưu resetToken để sử dụng cho bước reset password!**

---

## 5. Reset mật khẩu

### cURL:
```bash
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123xyz789def456",
    "newPassword": "newpass123"
  }'
```

### Response:
```json
{
  "message": "Đổi mật khẩu thành công"
}
```

---

## 6. Đổi mật khẩu (khi đã đăng nhập)

### cURL:
```bash
curl -X POST http://localhost:3000/api/auth/change-password \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "123456",
    "newPassword": "newpass789"
  }'
```

### Response:
```json
{
  "message": "Đổi mật khẩu thành công"
}
```

---

## Test với Postman

### 1. Import Collection
Tạo collection mới trong Postman với các request trên.

### 2. Sử dụng Environment Variables
Tạo environment với biến:
- `base_url`: `http://localhost:3000`
- `accessToken`: (sẽ được set tự động sau khi login)

### 3. Auto-save Token
Trong tab "Tests" của request Login, thêm:
```javascript
var jsonData = pm.response.json();
pm.environment.set("accessToken", jsonData.accessToken);
```

### 4. Sử dụng Token
Trong các request cần authentication, tab "Authorization":
- Type: Bearer Token
- Token: `{{accessToken}}`

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Vui lòng điền đầy đủ thông tin"
}
```

### 401 Unauthorized
```json
{
  "message": "Token không hợp lệ hoặc đã hết hạn"
}
```

### 404 Not Found
```json
{
  "message": "Người dùng không tồn tại"
}
```

### 500 Internal Server Error
```json
{
  "message": "Lỗi server"
}
```
