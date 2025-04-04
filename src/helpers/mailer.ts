import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {

      const updateUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000)
        }
      });
      console.log("Updated User for VERIFY", updatedUser);
      // await User.findByIdAndUpdate(userId, {
      //   verifyToken: hashedToken,
      //   verifyTokenExpiry: Date.now() + 3600000,
      // });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set:{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      }
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b052d0a999966b",
        pass: "cef48a9d79f2bc",
      },
    });

    const mailOptions = {
      from: "CyberShield@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


// import nodemailer from "nodemailer";
// import User from "@/models/userModel";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({
//   email,
//   emailType,
//   userId,
// }: {
//   email: string;
//   emailType: "VERIFY" | "RESET";
//   userId: string;
// }) => {
//   try {
//     // Create a hashed token
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     const updateFields =
//       emailType === "VERIFY"
//         ? {
//             verifyToken: hashedToken,
//             verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour expiry
//           }
//         : {
//             forgotPasswordToken: hashedToken,
//             forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
//           };

//     await User.findByIdAndUpdate(userId, { $set: updateFields });

//     // Email Transport Configuration
//     const transport = nodemailer.createTransport({
//       host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
//       port: Number(process.env.SMTP_PORT) || 2525,
//       auth: {
//         user: process.env.SMTP_USER || "your_mailtrap_user",
//         pass: process.env.SMTP_PASS || "your_mailtrap_pass",
//       },
//     });

//     if (!process.env.DOMAIN) {
//       throw new Error("Missing DOMAIN environment variable");
//     }

//     const mailOptions = {
//       from: '"CyberShield Support" <support@cybershield.com>',
//       to: email,
//       subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
//       html: `
//         <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
//         to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
//         <p>Or copy and paste this link into your browser:</p>
//         <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
//         <p>This link will expire in 1 hour.</p>
//       `,
//     };

//     const mailResponse = await transport.sendMail(mailOptions);
//     return mailResponse;
//   } catch (error: any) {
//     console.error("Error sending email:", error.message);
//     throw new Error(error.message);
//   }
// };
