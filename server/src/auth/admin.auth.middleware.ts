import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
export class AdminMiddleAuth implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const isLogedIn = req['user'];
        if (!isLogedIn) {
            throw new UnauthorizedException('Not authorized for admin');
        }
        if (isLogedIn.role === 'admin') {
            next();
        } else {
            throw new UnauthorizedException('Not authorized for admin');
        }
    }
}