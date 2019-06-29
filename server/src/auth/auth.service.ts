import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EmailLoginDto } from './login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { generateJwtToken } from '../shared/generate.jwt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }
    async emailLogin(emailDto: EmailLoginDto): Promise<any> {
        const user = await this.userRepository.findOne({ email: emailDto.email });
        if (!user) { throw new BadRequestException('invalid email / password'); }

        const checkPass = await bcrypt.compareSync(emailDto.password, user.password);
        if (!checkPass) { throw new BadRequestException('invalid email / password'); }
        return {
            data: {
                id: user.id,
                email: user.email,
                number: user.number,
                address: user.address,
            },
            token: await generateJwtToken({
                id: user.id,
                email: user.email,
            })
        };

    }
}
