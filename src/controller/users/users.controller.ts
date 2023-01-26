import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users } from 'models/entities/Users';
import { UsersService } from 'src/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) { }

    @Get()
    @HttpCode(200)
    findAllUsers(): Promise<any> {
        const hasil = this.UsersService.findAllUsers();
        //  console.log(hasil)
        return hasil
    }
    @Get(':id')
    @HttpCode(200)
    findOneBy(@Param('id') idUser: any) {
        const hasil = this.UsersService.findOneBy(idUser)
        return hasil
    }

    @Post('save')
    @HttpCode(200)
    async createUsers(@Body() body: any) {
        // console.log(body)
        const salt = await bcrypt.genSalt(10);
        const passSalt = await bcrypt.hash(body.passwords, salt);
        body.passwords = passSalt;

        return this.UsersService.createUsers(body);
    }
    @Put('edit/:id')
    @HttpCode(200)
    async updateUsers(@Param('id') id: number, @Body() body: Users) {
        const salt = await bcrypt.genSalt(10)
        const passSalt = await bcrypt.hash(body.passwords, salt)
        body.passwords = passSalt

        return this.UsersService.updateUsers(id, body)
    }
    @Delete('delete/:id')
    @HttpCode(200)
    async deleteUsers(@Param('id') id: number) {
        const hasdel = this.UsersService.deleteUsers(id)

        return hasdel
    }
}

// lanjutkan nnti istrirahat