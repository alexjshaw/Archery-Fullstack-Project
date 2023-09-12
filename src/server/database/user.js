import UserModel from '../models/userModel.js'

export default class User {
  static async createUser (query = {}) {
    try {
      const newUser = new UserModel(query)
      await newUser.save()
      return newUser
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async findOne (query = {}) {
    try {
      const user = await UserModel.findOne(query)
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async findMany (query = {}) {
    try {
      const users = await UserModel.find(query)
      return users
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async findAndUpdateProfile (userId, update) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: update },
        { new: true, runValidators: true }
      )
      if (!updatedUser) {
        throw new Error('No User Found')
      }

      return updatedUser
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
