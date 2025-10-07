# 🔍 Debug API Route 404 Error

## 🚨 Lỗi hiện tại: 404 Not Found

### **Nguyên nhân có thể:**

1. **API route chưa được deploy**
2. **File structure không đúng**
3. **Vercel chưa nhận diện API route**
4. **Environment variables chưa được set**

## 🔧 **Các bước debug:**

### **Bước 1: Kiểm tra API route có hoạt động không**

Truy cập: `https://ecom-black-nu.vercel.app/api/test`

Nếu trả về JSON → API routes hoạt động
Nếu 404 → Vấn đề với Vercel deployment

### **Bước 2: Kiểm tra file structure**

```
public/
├── api/
│   ├── send-order-email.js  ✅
│   └── test.js              ✅
├── checkout.html            ✅
└── package.json             ✅
```

### **Bước 3: Kiểm tra Vercel deployment**

1. Vào Vercel dashboard
2. Xem **Functions** tab
3. Kiểm tra logs để xem lỗi

### **Bước 4: Kiểm tra Environment Variables**

Trong Vercel dashboard:
- **Settings** → **Environment Variables**
- Kiểm tra có `RESEND_API_KEY` và `ADMIN_EMAIL` không

## 🚀 **Giải pháp:**

### **Option 1: Redeploy**
```bash
# Push code mới
git add .
git commit -m "Fix API route"
git push origin main

# Vercel sẽ tự động redeploy
```

### **Option 2: Manual Redeploy**
1. Vào Vercel dashboard
2. **Deployments** → **Redeploy** latest deployment

### **Option 3: Kiểm tra Vercel Functions**
1. Vào **Functions** tab trong Vercel dashboard
2. Xem có `/api/send-order-email` không
3. Xem logs để debug

## 🧪 **Test API route:**

### **Test 1: Basic API**
```bash
curl https://ecom-black-nu.vercel.app/api/test
```

### **Test 2: Email API**
```bash
curl -X POST https://ecom-black-nu.vercel.app/api/send-order-email \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## 📊 **Expected Results:**

### **✅ Success:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "emailId": "re_xxxxx"
}
```

### **❌ Error:**
```json
{
  "success": false,
  "error": "RESEND_API_KEY not configured"
}
```

## 🔧 **Troubleshooting:**

### **Lỗi "Function not found"**
- Kiểm tra file có đúng vị trí `/api/send-order-email.js`
- Redeploy project

### **Lỗi "Environment variable not found"**
- Thêm environment variables trong Vercel
- Redeploy sau khi thêm

### **Lỗi "Resend API key invalid"**
- Kiểm tra API key trong Resend dashboard
- Đảm bảo format đúng: `re_xxxxxxxxxx`

## 📞 **Support:**

- Vercel Docs: [https://vercel.com/docs](https://vercel.com/docs)
- Vercel Support: support@vercel.com
- Resend Docs: [https://resend.com/docs](https://resend.com/docs)

---

**🎯 Mục tiêu: API route hoạt động và trả về response thay vì 404**
