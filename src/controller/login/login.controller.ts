import { Controller,Body ,Post,HttpCode, InternalServerErrorException,Req} from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
@Controller('login')
export class LoginController {

    constructor(private readonly UsersService: UsersService) {}

    @Post()
    @HttpCode(200)
    async findOneUsersWithUsername(@Body() body:any) {
      const result = await this.UsersService.findOneUsersWithUsername(body.username);
  
      if (result) {
        if(bcrypt.compareSync(body.passwords, result.passwords)){
          delete result.passwords; //password jangan dimasukin ke token
          let token = jwt.sign({result}, process.env.SECRET_KEY, {
            expiresIn: '2h', //expired in 2 minutes
          });
          console.log(token)
  
          console.log('berhasil')
          return { message: 'Berhasil login', token: token };
      }else{
            return { message: 'Password salah'};
  
        }
      } else {
        return { message: 'Username tidak ada' };
      }
    }
  
    @Post('logout')
  logout(@Req() req) {
    req.session.destroy((err: any) => {
      if (err) {
        throw new InternalServerErrorException();
      }
    });
    return 'Logged out successfully';
  }
  

}
