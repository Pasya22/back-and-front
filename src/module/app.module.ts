import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'models/entities/Users';
import { LoginController } from 'src/controller/login/login.controller';
import { UsersController } from 'src/controller/users/users.controller';
import { UsersService } from 'src/service/users/users.service';
// import 'dotenv/config'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type :'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'root',
      database:'db_admin',
      entities: ['dist/entities/**/*{.ts,.js}'],
      synchronize:false,
      autoLoadEntities:true
    }),
    TypeOrmModule.forFeature([Users])
  ],
  
  controllers: [UsersController,LoginController],
  providers: [UsersService],
})
export class AppModule {}
