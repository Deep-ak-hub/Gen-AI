import { AppConfig } from "../config/app.config.js";
import EmailService from "../services/email.service.js";

class AuthEmailService extends EmailService {

  async notifyToActivateUserAccout(user) {
    try {
      let activationLink = AppConfig.frontendURL + "/verify/" + user.activationToken;

      return await this.sendEmail({
        to: user.email,
        subject: "Activate your account !!",
        message: `
        <div style="width: 100%; background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #008080; margin-bottom: 20px; text-align: center;">Welcome to Our Platform!</h1>
        <p style="color: #444; font-size: 16px; line-height: 1.6; text-align: center;">
          Thank you for registering! Please activate your account by clicking the button below.
          The activation link is valid for 24 hours.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${activationLink}" style="background-color: #008080; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Activate Account</a>
        </div>
        <p style="color: #666; font-size: 14px; text-align: center; margin: 20px 0;">
          If the button doesn't work, copy and paste this link in your browser:
        </p>
        <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; word-break: break-all; text-align: center;">
          <code style="color: #008080;">${activationLink}</code>
        </div>
        <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          This is an automated message. Please do not reply to this email.
        </p>
          </div>
        </div>
        `
      });
    } catch (exception) {
      console.log(exception)
      throw exception;
    }
  }

  async notifyWelcomeMessage(user) {
    try {
      const to = AppConfig.frontendURL;
      return await this.sendEmail({
        to: user.email,
        subject: "Thank you for registering with us!!!",
        message: `
        <div style="width: 100%; background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px;">
            <h1 style="color: #145774; margin-bottom: 20px;">Welcome ${
              user.name || "Valued Customer"
            }!</h1>
            <p style="color: #444; font-size: 16px; line-height: 1.6;">
            Your account has been successfully created. We're excited to have you as part of our community!
            </p>
            <div style="text-align: center; margin: 30px 0;">
            <a href="${to}" style="background-color: #145774; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Your Account</a>
            </div>
            <p style="color: #999; font-size: 11px; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            This is an automated message. Please do not reply directly to this email.
            </p>
            </div>
        </div>
        `,
      });
    } catch (exception) {
      exception;
    }
  }

  async sendResetLink(userDetail) {
    try {
      let forgetPasswordLink = AppConfig.frontendURL+"verify-token/"+userDetail.forgetPasswordToken
      return await this.sendEmail({
        to: userDetail.email,
        subject: "Reset Password Request",
        message: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background-color: #008080; padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0;">Password Reset Request</h1>
            </div>
            
            <div style="padding: 20px;">
                <p style="font-size: 16px; line-height: 1.5;">Dear User,</p>
                <p style="font-size: 16px; line-height: 1.5;">We received a request to reset your password. Click the button below to set a new password:</p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${forgetPasswordLink}" style="background-color: #008080; color: white; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                
                <p style="font-size: 16px; line-height: 1.5;">This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>
                
                <p style="font-size: 16px; line-height: 1.5;">If the button above doesn't work, copy and paste this link into your browser:</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; word-break: break-all; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #555;">${forgetPasswordLink}</p>
                </div>
                
                <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>The Team</p>
            </div>
            
            <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 14px; color: #666;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Our Platform. All rights reserved.</p>
            </div>
        </div>
        `
      })
    } catch (exception) {
      throw exception
    }
  }
}

export const authEmailService = new AuthEmailService();
