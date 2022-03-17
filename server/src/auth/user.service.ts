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
        //async 요청을 한 뒤에 아무것도 리턴 해주지 않기 때문에 void를 쓴다.
        user.password = await bcrypt.hash(
            user.password, 10,
        )

        return Promise.resolve();
    }
}