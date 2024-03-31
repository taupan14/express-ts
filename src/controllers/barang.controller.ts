import type { NextFunction, Request, Response } from 'express'
import { getBarang } from '../services/barang.service'

export const getAllBarang = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = await getBarang()
    return res.status(200).json({
      error: null,
      message: 'Pengambilan semua data',
      data
    })
  } catch (error: Error | unknown) {
    next(
      new Error(
        'Error pada file src/controller/barang.controller.ts : ' +
          String((error as Error).message)
      )
    )
  }
}

export const insertBarang = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  // try {
  //   const { error, value } = inputBarangValidation(req.body)
  //   if (error != null) {
  //     return res.status(400).json({
  //       error: error.details[0].message,
  //       message: 'Input data gagal!',
  //       data: value
  //     })
  //   }
  //   return res.status(200).json({
  //     error: null,
  //     message: 'Input data berhasil',
  //     data: value
  //   })
  // } catch (error: Error | any) {
  //   next(
  //     new Error(
  //       'Error pada file src/controller/barang.controller.ts : ' + error.message
  //     )
  //   )
  // }
}
