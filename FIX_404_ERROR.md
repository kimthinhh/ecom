# 🔧 Sửa lỗi 404 - API Route không tìm thấy

## 🚨 **Vấn đề: API routes bị 404**

### **Nguyên nhân:**
- API routes nằm trong thư mục `public/api/` 
- Vercel cần API routes ở **root level** (`/api/`)
- File structure không đúng cho Vercel

## ✅ **Đã sửa:**

### **1. Di chuyển API routes ra root level:**
```
❌ Trước (sai):
public/
├── api/
│   ├── send-order-email.js
│   └── test.js

✅ Sau (đúng):
api/
├── send-order-email.js
└── test.js
public/
├── checkout.html
├── index.html
└── ...
```

### **2. Cập nhật file structure:**
- ✅ **`api/send-order-email.js`** - API route chính
- ✅ **`api/test.js`** - API route test
- ✅ **`package.json`** - Dependencies
- ✅ **`vercel.json`** - Vercel config

## 🚀 **Các bước deploy:**

### **Bước 1: Push code mới**
```bash
git add .
git commit -m "Fix API routes structure"
git push origin main
```

### **Bước 2: Vercel sẽ tự động redeploy**
- Vercel detect changes
- Redeploy với structure mới

### **Bước 3: Test API routes**
1. **Test API cơ bản:**
   ```
   https://ecom-black-nu.vercel.app/api/test
   ```
   Expected: JSON response với message "API is working!"

2. **Test email API:**
   ```
   POST https://ecom-black-nu.vercel.app/api/send-order-email
   ```

## 🔍 **Kiểm tra:**

### **1. Vercel Dashboard:**
- Vào **Functions** tab
- Xem có `/api/send-order-email` và `/api/test` không

### **2. Environment Variables:**
- **Settings** → **Environment Variables**
- Kiểm tra có `RESEND_API_KEY` và `ADMIN_EMAIL`

### **3. Logs:**
- Xem logs trong **Functions** tab
- Debug nếu có lỗi

## 📊 **Expected Results:**

### **✅ Success:**
```json
// GET /api/test
{
  "message": "API is working!",
  "method": "GET",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "url": "/api/test"
}

// POST /api/send-order-email
{
  "success": true,
  "message": "Email sent successfully",
  "emailId": "re_xxxxx"
}
```

### **❌ Error (nhưng không 404):**
```json
{
  "success": false,
  "error": "RESEND_API_KEY not configured"
}
```

## 🎯 **Next Steps:**

1. **Push code** với structure mới
2. **Wait for redeploy** (2-3 phút)
3. **Test `/api/test`** trước
4. **Test checkout** sau
5. **Check email** nhận được

## 📞 **Nếu vẫn 404:**

### **Kiểm tra:**
1. **File structure** có đúng không
2. **Vercel deployment** có thành công không
3. **Environment variables** có được set không
4. **Logs** có lỗi gì không

### **Debug commands:**
```bash
# Kiểm tra file structure
ls -la api/

# Kiểm tra Vercel deployment
vercel logs
```

---

**🎉 Sau khi sửa, API routes sẽ hoạt động và không còn 404!**
