# 🚀 Hướng dẫn Deploy Tnagnle lên Vercel

## 📋 Chuẩn bị

### 1. Tạo tài khoản Vercel
1. Truy cập [https://vercel.com](https://vercel.com)
2. Đăng ký tài khoản (dùng GitHub)
3. Kết nối GitHub repository

### 2. Cấu hình Resend
1. Tạo tài khoản tại [https://resend.com](https://resend.com)
2. Lấy API key từ dashboard
3. Verify domain (tùy chọn)

## 🚀 Deploy lên Vercel

### Bước 1: Push code lên GitHub
```bash
git add .
git commit -m "Add Vercel API route for email"
git push origin main
```

### Bước 2: Deploy trên Vercel
1. Truy cập [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import GitHub repository
4. Vercel sẽ tự động detect và deploy

### Bước 3: Cấu hình Environment Variables
Trong Vercel dashboard:
1. Vào **Settings** → **Environment Variables**
2. Thêm các biến sau:

```
RESEND_API_KEY = re_your_actual_api_key_here
ADMIN_EMAIL = your-email@example.com
```

### Bước 4: Redeploy
1. Sau khi thêm environment variables
2. Vào **Deployments** → **Redeploy** latest deployment

## 🔧 Cấu trúc Files

```
public/
├── api/
│   └── send-order-email.js    # Vercel API route
├── checkout.html              # Trang checkout
├── package.json              # Dependencies
├── vercel.json               # Vercel config
└── ... (các file khác)
```

## 📧 Cách hoạt động

### 1. Khách hàng đặt hàng
- Điền form checkout
- Nhấn "Confirm & Send"

### 2. Frontend gửi request
```javascript
fetch('/api/send-order-email', {
    method: 'POST',
    body: JSON.stringify(orderData)
})
```

### 3. Vercel API route xử lý
- Nhận dữ liệu đơn hàng
- Gọi Resend API
- Gửi email đến admin

### 4. Email được gửi
- Admin nhận email với thông tin đầy đủ
- Không có lỗi CORS

## 🎯 Ưu điểm khi deploy lên Vercel

### ✅ Không có lỗi CORS
- API route chạy trên server
- Không bị chặn bởi browser

### ✅ Bảo mật API key
- API key không expose ra frontend
- Lưu trong environment variables

### ✅ Performance tốt
- Vercel Edge Network
- Tốc độ nhanh toàn cầu

### ✅ Miễn phí
- Vercel Free plan: 100GB bandwidth
- Resend Free plan: 3,000 emails/tháng

## 🔍 Troubleshooting

### Lỗi "Function not found"
- Kiểm tra file `api/send-order-email.js` có đúng vị trí
- Redeploy project

### Lỗi "Environment variable not found"
- Kiểm tra environment variables trong Vercel dashboard
- Redeploy sau khi thêm variables

### Lỗi "Resend API key invalid"
- Kiểm tra API key trong Resend dashboard
- Đảm bảo API key đúng format

## 📊 Monitoring

### Vercel Dashboard
- Xem logs trong **Functions** tab
- Monitor performance và errors

### Resend Dashboard
- Xem email đã gửi
- Monitor delivery rates

## 🎉 Kết quả

Sau khi deploy thành công:
- ✅ Website hoạt động trên domain Vercel
- ✅ Email gửi được không lỗi CORS
- ✅ API key được bảo mật
- ✅ Performance tốt

## 📞 Support

- Vercel Docs: [https://vercel.com/docs](https://vercel.com/docs)
- Resend Docs: [https://resend.com/docs](https://resend.com/docs)
- Tnagnle Support: custumercare@tnagnle.asia

---

**🎉 Chúc mừng! Bạn đã deploy thành công Tnagnle lên Vercel!**
