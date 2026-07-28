import {Resend} from "resend"
import { ResendConfig } from "../config/app.config.js";

class EmailService {
  #transport;

  constructor() {
    try {
      this.#transport = new Resend(ResendConfig.resendApiKey);
      console.log("RESEND CONNECTED ✅");
    } catch (exception) {
      console.log("Resend init failed:", exception);
      throw {
        code: 500,
        message: "Resend not connected....",
        status: "RESEND_CONNECTION_ERROR",
      };
    }
  }

  async sendEmail({
    to,
    subject,
    message,
    cc = null,
    bcc = null,
    attachment = null,
  }) {
    try {
      let messageBody = {
        from: ResendConfig.resendFROM,
        to: to,
        subject: subject,
        html: message,
      };

      if (cc) {
        messageBody["cc"] = cc;
      }
      if (bcc) {
        messageBody["bcc"] = bcc;
      }
      if (attachment) {
        messageBody["attachments"] = attachment;
      }

      return await this.#transport.emails.send(messageBody);
    } catch (exception) {
      console.log(exception);
      throw {
        code: 500,
        message: "Email not sent",
        status: "RESEND_EMAIL_NOT_SENT_ERROR",
      };
    }
  }
}

export default EmailService
