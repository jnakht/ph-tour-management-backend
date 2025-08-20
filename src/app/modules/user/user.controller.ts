/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";
import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


// const createUserFunction = async (req: Request, res: Response) => {
    // const user = await UserServices.createUser(req.body);
    //     res.status(StatusCodes.CREATED).json({
    //         message: "User created successfully!",
    //         user
    //     })
// }



// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // throw new Error("Fake Error");
//         // throw new AppError(httpStatus.BAD_REQUEST, "fake error");
//         createUserFunction(req, res);
//     } catch (err: any) {
//         console.log(err);
//         next(err);
//     }
// }
const createUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
     const user = await UserServices.createUser(req.body);
    //  res.status(httpStatus.CREATED).json({
    //     message: "User created successfully!",
    //     user
    // })
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User Created Successfully!",
        data: user
    })
})


const getAllUser = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All Users retrieved successfully",
    //     data: users
    // })
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "All Users Retrieved Successfully!",
        data: result.data,
        meta: result.meta
    })
})

export const UserControllers = {
    createUser,
    getAllUser
}