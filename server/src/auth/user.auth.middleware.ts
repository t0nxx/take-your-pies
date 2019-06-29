import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

@Injectable()
export class UserAuthMiddleware implements NestMiddleware {

    constructor(private userService: UserService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) { throw new UnauthorizedException('Not authorized'); }
        try {
            const decode: any = await jwt.verify(token, process.env.JWTSECRET);
            const user = await this.userService.getOneUser(decode.id);
            if (!user) { throw new UnauthorizedException('Not authorized'); }
            req['user'] = user; // req.user will not work with ts
            next();
        } catch (error) {
            throw new UnauthorizedException('Not authorized');
        }
    }

}
