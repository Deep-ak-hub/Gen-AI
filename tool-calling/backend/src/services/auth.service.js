import bcrypt from "bcryptjs";
import { randomStringGenerator, createDate } from "../utils/helper.js";
import { Status } from "../config/constants.js";

class AuthService {
  async transformUserForRegistration(req) {
    try {
      const data = req.body;

      data.password = bcrypt.hashSync(data.password, 12);

      data.activationToken = randomStringGenerator();
      data.expiryTime = createDate(new Date(), 1);
      data.status = Status.INACTIVE;

      return data;
    } catch (exception) {
      throw exception;
    }
  }

  async transformUserForUpdate(req) {
    const data = req.body;

    if (data.password && data.password.trim() !== "") {
      data.password = bcrypt.hashSync(data.password, 12);
    } else {
      delete data.password;
    }

    delete data.status;
    delete data.activationToken;
    delete data.forgetPasswordToken;
    delete data.expiryTime;

    return data;
  }
}

export const authService = new AuthService();
