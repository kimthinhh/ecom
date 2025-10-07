// API route cho Vercel - /api/send-order-email.js
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Chỉ cho phép POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const orderData = req.body;
        
        // Log để debug
        console.log('Received order data:', orderData);
        
        // Kiểm tra Resend API key
        if (!process.env.RESEND_API_KEY) {
            return res.status(500).json({ 
                success: false, 
                error: 'RESEND_API_KEY not configured' 
            });
        }
        
        // Tạo nội dung email HTML
        const emailContent = `
            <h2>🛍️ Đơn hàng mới từ Tnagnle, Inc.</h2>
            
            <h3>👤 Thông tin khách hàng:</h3>
            <ul>
                <li><strong>Tên:</strong> ${orderData.customer.name}</li>
                <li><strong>Email:</strong> ${orderData.customer.email}</li>
                <li><strong>Số điện thoại:</strong> ${orderData.customer.phone}</li>
                <li><strong>Địa chỉ:</strong> ${orderData.customer.address}</li>
                ${orderData.customer.notes ? `<li><strong>Ghi chú:</strong> ${orderData.customer.notes}</li>` : ''}
            </ul>
            
            <h3>🛒 Chi tiết đơn hàng:</h3>
            <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                <thead>
                    <tr style="background-color: #f5f5f5;">
                        <th>Sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderData.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td>${item.quantity}</td>
                            <td>$${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <h3>💰 Tổng kết:</h3>
            <ul>
                <li><strong>Tổng phụ:</strong> $${orderData.subtotal.toFixed(2)}</li>
                <li><strong>Phí vận chuyển:</strong> $${orderData.shipping.toFixed(2)}</li>
                <li><strong>Tổng cộng:</strong> $${orderData.total.toFixed(2)}</li>
            </ul>
            
            <p><strong>📅 Ngày đặt hàng:</strong> ${new Date(orderData.orderDate).toLocaleString('vi-VN')}</p>
            
            <hr>
            <p><em>📧 Email này được gửi tự động từ hệ thống Tnagnle, Inc.</em></p>
        `;
        
        // Dynamic import Resend
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Gửi email
        const { data, error } = await resend.emails.send({
            from: 'Resend <onboarding@resend.dev>', // Thay đổi domain theo domain của bạn
            to: [process.env.ADMIN_EMAIL || 'shiyou247@gmail.com'],
            subject: `🛍️ Đơn hàng mới từ ${orderData.customer.name} - Tnagnle, Inc.`,
            html: emailContent,
        });
        
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ 
                success: false, 
                error: 'Failed to send email',
                details: error.message 
            });
        }
        
        console.log('Email sent successfully:', data);
        return res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully',
            emailId: data.id 
        });
        
    } catch (error) {
        console.error('Error in sendOrderEmail:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Internal server error',
            details: error.message 
        });
    }
}
