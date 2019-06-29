import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiImplicitHeader } from '@nestjs/swagger';
import { EmailLoginDto } from './login.dto';
import { AuthService } from './auth.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/email')
    async emailLogin(@Body() emailDto: EmailLoginDto) {
        return this.authService.emailLogin(emailDto);
    }
}
