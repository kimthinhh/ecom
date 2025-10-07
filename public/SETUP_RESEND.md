# Hướng dẫn Setup Resend Email cho Tnagnle Checkout

## 📧 Tích hợp Resend Email Service

### 1. Tạo tài khoản Resend
1. Truy cập [https://resend.com](https://resend.com)
2. Đăng ký tài khoản miễn phí
3. Xác thực email của bạn

### 2. Lấy API Key
1. Đăng nhập vào dashboard Resend
2. Vào **API Keys** section
3. Tạo API key mới
4. Copy API key (dạng: `re_xxxxxxxxxx`)

### 3. Cấu hình Domain (Tùy chọn)
- Nếu có domain riêng: Thêm domain vào Resend
- Nếu không có domain: Sử dụng domain mặc định của Resend

### 4. Cài đặt Dependencies
```bash
# Trong thư mục public/
npm install
```

### 5. Cấu hình Email
Chỉnh sửa file `api/send-order-email.js`:

```javascript
// Thay đổi dòng này:
const resend = new Resend('YOUR_RESEND_API_KEY');

// Thành:
const resend = new Resend('re_your_actual_api_key_here');
```

```javascript
// Thay đổi email nhận thông báo:
to: ['your-email@example.com'],

// Thành email thực của bạn:
to: ['admin@tnagnle.com'],
```

### 6. Chạy Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 7. Test Email
1. Mở trang checkout
2. Thêm sản phẩm vào giỏ hàng
3. Điền form checkout
4. Nhấn "Confirm & Send"
5. Kiểm tra email của bạn

## 📋 Cấu trúc Email

Email sẽ bao gồm:
- **Thông tin khách hàng**: Tên, email, SĐT, địa chỉ, ghi chú
- **Chi tiết đơn hàng**: Bảng sản phẩm với hình ảnh, giá, số lượng
- **Tổng kết**: Subtotal, shipping, total
- **Thời gian đặt hàng**

## 🔧 Troubleshooting

### Lỗi thường gặp:

1. **"Invalid API key"**
   - Kiểm tra API key trong `api/send-order-email.js`
   - Đảm bảo API key đúng format

2. **"Domain not verified"**
   - Sử dụng domain mặc định của Resend
   - Hoặc verify domain trong Resend dashboard

3. **"Email not sent"**
   - Kiểm tra console logs
   - Kiểm tra network tab trong browser
   - Đảm bảo server đang chạy

### Debug:
```javascript
// Thêm vào checkout.html để debug
console.log('Sending order data:', orderData);
```

## 📊 Monitoring

- Kiểm tra Resend dashboard để xem email đã gửi
- Logs trong server console
- Browser console để debug

## 🚀 Production Deployment

1. **Deploy server** lên VPS/Cloud
2. **Cấu hình domain** trong Resend
3. **Set environment variables**:
   ```bash
   export RESEND_API_KEY=your_api_key
   export ADMIN_EMAIL=your_email@domain.com
   ```

## 💰 Chi phí

- **Resend Free Plan**: 3,000 emails/tháng
- **Resend Pro Plan**: $20/tháng cho 50,000 emails
- **Resend Enterprise**: Liên hệ sales

## 📞 Support

- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com
