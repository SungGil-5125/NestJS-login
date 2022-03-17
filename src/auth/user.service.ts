import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { User } from "./entity/user.entity";

@Injectable()
export class UserSurvice{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository
    ){}

    async findByFeilds(options : FindOneOptions<UserDTO>) : Promise<User | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO : UserDTO) : Promise<UserDTO | undefined> {
        await this.transformrPassword(userDTO);
        console.log(userDTO);
        return await this.userRepository.save(userDTO);
    }

    async transformrPassword(user : UserDTO ): Promise<void> {
        user.password = await bcrypt.hash(
            user.password, 10,
        )

        return Promise.resolve();
    }
}