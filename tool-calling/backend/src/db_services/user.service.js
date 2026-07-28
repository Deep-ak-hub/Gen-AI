import { getPagination } from "../utils/pagination.js";
import { UserModel } from "../models/user.model.js";

class UserService {
  async storeUser(data) {
    try {
      const user = new UserModel(data);
      return await user.save();
      // UserModel.insertOne()
    } catch (exception) {
      throw exception;
    }
  }

  async getSingleRowByFilter(filter) {        
    try {
      const userDetail = await UserModel.findOne(filter);
      return userDetail;
    } catch (exception) {
      throw exception;
    }
  }

  async updateSingleRowByFilter(filter, data) {
    try {
      return await UserModel.findOneAndUpdate(
        filter,
        { $set: data },
        { new: true },
      );
    } catch (exception) {
      throw exception;
    }
  }

  getUserPublicProfile(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  }

  async getAllRowsByFilter(filter, query) {
    try {
      const {page, limit, skip} = getPagination(query)

      const data = await UserModel.find(filter)
        .sort({createdAt: "desc"})
        .limit(limit)
        .skip(skip)

      const total = await UserModel.countDocuments(filter)

      return {
        data: data.map((user) => this.getUserPublicProfile(user)),
        pagination: {
          page: page,
          limit: limit,
          total: total
        }
      }

    } catch (exception) {
      throw exception
    }
  }

  async deleteSingleRowByFilter(filter) {
    try {
      return await UserModel.findOneAndDelete(filter)
    } catch (exception) {
      throw exception
    }
  }
}

export const userService = new UserService();
