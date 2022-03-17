import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { UserSurvice } from './user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      inject : [ConfigService],
      useFactory : (config : ConfigService) => ({
        secret : config.get<string>('SECRET_KEY'),
        signOptions : {expiresIn : '300s'},
      })
    })
    ],

  exports : [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserSurvice]
})
export class AuthModule {}
