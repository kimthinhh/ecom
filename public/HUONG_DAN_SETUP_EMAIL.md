# 📧 Hướng dẫn Setup Email Resend cho Tnagnle Checkout


## 🚀 Setup Nhanh (5 phút)

### Bước 1: Tạo tài khoản Resend
1. Truy cập [https://resend.com](https://resend.com)
2. Đăng ký tài khoản miễn phí
3. Xác thực email

### Bước 2: Lấy API Key
1. Đăng nhập vào Resend dashboard
2. Vào **API Keys** → **Create API Key**
3. Đặt tên: "Tnagnle Checkout"
4. Copy API key (dạng: `re_xxxxxxxxxx`)

### Bước 3: Cấu hình trong checkout.html
Mở file `checkout.html` và tìm dòng 829-831:

```javascript
const RESEND_API_KEY = 'YOUR_RESEND_API_KEY'; // Thay bằng API key thực
const ADMIN_EMAIL = 'your-email@example.com'; // Thay bằng email của bạn
const FROM_EMAIL = 'orders@tnagnle.com'; // Thay bằng email gửi
```

**Thay đổi thành:**
```javascript
const RESEND_API_KEY = 're_your_actual_api_key_here';
const ADMIN_EMAIL = 'admin@tnagnle.com'; // Email của bạn
const FROM_EMAIL = 'orders@tnagnle.com'; // Email gửi (có thể dùng domain mặc định)
```

### Bước 4: Test Email
1. Mở trang checkout
2. Thêm sản phẩm vào giỏ hàng
3. Điền form và nhấn "Confirm & Send"
4. Kiểm tra email của bạn

## 🔧 Troubleshooting

### Lỗi "Invalid API key"
- Kiểm tra API key có đúng không
- Đảm bảo không có khoảng trắng thừa

### Lỗi "Domain not verified"
- Sử dụng email từ domain đã verify
- Hoặc dùng domain mặc định của Resend

### Lỗi CORS
- Mở trang từ server (không phải file://)
- Hoặc dùng extension CORS

## 📊 Nội dung Email

Email sẽ bao gồm:
- ✅ **Thông tin khách hàng** (tên, email, SĐT, địa chỉ, ghi chú)
- ✅ **Bảng sản phẩm** với hình ảnh, giá, số lượng
- ✅ **Tổng kết** (subtotal, shipping, total)
- ✅ **Thời gian đặt hàng**

## 💰 Chi phí

- **Free Plan**: 3,000 emails/tháng
- **Pro Plan**: $20/tháng cho 50,000 emails
- **Enterprise**: Liên hệ sales

## 🎯 Tính năng

- ✅ Gửi email tự động khi đặt hàng
- ✅ Không gửi email xác nhận cho khách hàng
- ✅ Chỉ gửi thông báo đến admin
- ✅ Email HTML đẹp với bảng sản phẩm
- ✅ Hỗ trợ ghi chú đơn hàng

## 📞 Support

- Resend Docs: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: support@resend.com
- Tnagnle Support: custumercare@tnagnle.asia

---

**🎉 Chúc mừng! Bạn đã setup thành công hệ thống email cho Tnagnle checkout!**
