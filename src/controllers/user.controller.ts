import { type NextFunction, type Request, type Response } from 'express'
import {
  inputUserValidation,
  loginUserValidation
} from '../validations/user.validation'
import { createUser, userLogin } from '../services/user.service'
import { encrypt } from '../utils/bcrypt'
import { compare } from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt'

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = inputUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Input data gagal',
        data: value
      })
    }

    value.password = encrypt(value.password)
    delete value.confirmPassword
    const user = await createUser(value)
    return res.status(200).json({
      error: null,
      message: 'Input data berhasil',
      data: user
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controller/user.controller.ts : registerUser - ' +
          String((error as Error).message)
      )
    )
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const { error, value } = loginUserValidation(req.body)
    if (error != null) {
      return res.status(400).json({
        error: error.details[0].message,
        message: 'Login gagal',
        data: value
      })
    }
    const user = await userLogin(value)
    if (user == null) {
      return res.status(400).json({
        error: 'User tidak ditemukan',
        message: 'Login gagal',
        data: value
      })
    }
    if (!compare(value.password, user.password)) {
      return res.status(400).json({
        error: 'Password salah',
        message: 'Login gagal',
        data: value
      })
    }

    // const dataUser = {
    //   id: user.user_id,
    //   email: user.email,
    //   nama: user.nama,
    //   role: user.role
    // }
    user.password = '***'
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    return res.status(200).json({
      error: null,
      message: 'Login berhasil',
      data: user,
      accessToken,
      refreshToken
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controller/user.controller.ts : loginUser - ' +
          String((error as Error).message)
      )
    )
  }
}
