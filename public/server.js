// Server Express để chạy API gửi email
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sendOrderEmail } = require('./api/send-order-email');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API endpoint để gửi email đơn hàng
app.post('/api/send-order-email', sendOrderEmail);

// Serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Make sure to:');
    console.log('1. Install dependencies: npm install express cors resend');
    console.log('2. Set your Resend API key in api/send-order-email.js');
    console.log('3. Update your email address in api/send-order-email.js');
});
