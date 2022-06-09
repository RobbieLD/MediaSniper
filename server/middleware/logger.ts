import { NextFunction, Request, Response } from 'express'

// TODO: Add error logging
// TODO: Add logging framework
export default class Logger {
    public static Log(request: Request, response: Response, next: NextFunction) {
        console.log(`${request.method} ${request.path}`)
        next()
    }
}