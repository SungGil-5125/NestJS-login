import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserSurvice } from './user.service';
import * as bcrypt from  "bcrypt";
import { Payload } from './security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userServise : UserSurvice,
        private jwtServise : JwtService
        ){}

        async registerUser(newUser : UserDTO) : Promise<UserDTO | undefined> {
            let userFind : UserDTO = await this.userServise.findByFeilds({
                where : { username : newUser.username}
            })

            if(userFind){
                throw new HttpException("username is aready use", HttpStatus.BAD_REQUEST);
            }

            return this.userServise.save(newUser);
        }

        async validataUser(userDTO : UserDTO) : Promise<{accessToken : string} | undefined> {
            let userFind : User = await this.userServise.findByFeilds({
                where : { username : userDTO.username }
            })
                const validatePassword = await bcrypt.compare(userDTO.password, userFind.password);
                if(!userFind || !validatePassword) {
                    throw new UnauthorizedException(); //인증을 못했다는 예외처리
                }
            
            const payload : Payload = { id : userFind.id, username : userFind.username};

            return {
                accessToken : this.jwtServise.sign(payload)
            }
        }
}
