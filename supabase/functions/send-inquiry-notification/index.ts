import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  adminEmail: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, adminEmail }: InquiryNotificationRequest = await req.json();

    console.log("Sending notification email for inquiry from:", name, email);

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "AquaHue Web <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Contact Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: 600; color: #6366f1; font-size: 14px; text-transform: uppercase; }
              .value { margin-top: 5px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #6366f1; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">📬 New Contact Inquiry</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">You have received a new message from your website</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${phone ? `
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from AquaHue Web contact form</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to the user
    const userEmailResponse = await resend.emails.send({
      from: "AquaHue Web <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">✨ Thank You, ${name}!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">We've received your message</p>
              </div>
              <div class="content">
                <p>Hi ${name},</p>
                <p>Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.</p>
                <p>Here's a copy of your message:</p>
                <blockquote style="padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #6366f1; margin: 20px 0;">
                  ${message.replace(/\n/g, '<br>')}
                </blockquote>
                <p>Best regards,<br><strong>The AquaHue Web Team</strong></p>
              </div>
              <div class="footer">
                <p>© AquaHue Web - Professional Web Design</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("User confirmation sent:", userEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse, 
        userEmail: userEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-inquiry-notification function:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
