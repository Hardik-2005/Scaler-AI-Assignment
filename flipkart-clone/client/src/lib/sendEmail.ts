import emailjs from "@emailjs/browser";

interface EmailParams {
  orderId: string;
  userName: string;
  userEmail: string;
  totalAmount: number;
  estimatedDelivery: string;
  deliveryAddress: string;
  productNames: string;
}

export const sendConfirmationEmail = async (params: EmailParams) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("EmailJS environment variables are missing. Skipping email.");
    return false;
  }

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f1f3f6; padding: 20px;">
      <div style="background-color: #2874f0; padding: 20px; text-align: center; border-radius: 4px 4px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">Flipkart</h1>
      </div>
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 4px 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Order Confirmed!</h2>
        <p style="color: #666666; font-size: 16px;">Hi <strong>${params.userName}</strong>,</p>
        <p style="color: #666666; font-size: 16px;">Thank you for your order. We've received your request and it's currently being processed.</p>
        
        <div style="margin: 25px 0; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden;">
          <div style="background-color: #f9f9f9; padding: 15px; border-bottom: 1px solid #e0e0e0;">
            <strong style="color: #333333;">Order ID:</strong> <span style="color: #2874f0;">${params.orderId}</span>
          </div>
          <div style="padding: 15px;">
            <p style="margin: 0 0 10px 0; color: #666666;"><strong>Estimated Delivery:</strong> ${params.estimatedDelivery}</p>
            <p style="margin: 0 0 10px 0; color: #666666;"><strong>Products:</strong> ${params.productNames}</p>
            <p style="margin: 0; color: #666666;"><strong>Total Amount:</strong> <span style="font-size: 18px; font-weight: bold; color: #212121;">₹${params.totalAmount.toLocaleString("en-IN")}</span></p>
          </div>
        </div>

        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #333333; font-size: 16px;">Delivery Address</h3>
          <p style="margin: 0; color: #666666; line-height: 1.5;">${params.deliveryAddress}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <a href="#" style="background-color: #fb641b; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 2px; font-weight: bold; font-size: 16px; display: inline-block;">Track Your Order</a>
        </div>
      </div>
      <div style="text-align: center; padding-top: 20px; color: #999999; font-size: 12px;">
        <p style="margin: 0;">Need help? Contact our customer support</p>
        <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} Flipkart Clone. All rights reserved.</p>
      </div>
    </div>
  `;

  try {
    const templateParams = {
      order_id: params.orderId,
      to_name: params.userName,
      to_email: params.userEmail,
      html_content: htmlTemplate,
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log("Email sent successfully!", response.status, response.text);
    return true;
  } catch (error) {
    console.error("Failed to send email via EmailJS:", error);
    return false;
  }
};
