import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserUpdateDto, hashUpdatePass } from './user.update.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    /* get all users */
    async getAllUsers(): Promise<any> {
        const [data, count] = await this.userRepository.findAndCount();
        return { data, count };
    }

    /* get one user */
    async getOneUser(id: number) {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        return findOne;
    }

    /* add new user */
    async createNewUser(userDto: UserDto) {
        /* to fire before insert trigger 
         we need to creat instance of entity first
        then assign the porps to it .
        */
        const newUser = new User();
        Object.assign(newUser, userDto);
        return await this.userRepository.save(newUser);
    }

    /* update user */
    async updateUser(id: number, updateUser: UserUpdateDto): Promise<any> {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        if (Object.keys(updateUser).length <= 0) {
            throw new BadRequestException('no data provided');
        }
        if (updateUser.password) {
            updateUser.password = await hashUpdatePass(updateUser.password);
        }

        await this.userRepository.update(id, updateUser);
        const updated = await this.userRepository.findOne(id);
        return updated;
    }

    /* get one user */
    async deletUser(id: number) {
        const findOne = await this.userRepository.findOne(id);
        if (!findOne) {
            throw new NotFoundException('invalid id');
        }
        await this.userRepository.delete(id);
        return 'done . user deleted';
    }
}
