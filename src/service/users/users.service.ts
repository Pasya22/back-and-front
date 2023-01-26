import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm/dist';
// import UsersDto from 'src/controller/users/users.dto';
import { Users } from 'models/entities/Users';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) { }

    async findAllUsers(): Promise<any> {
        const hasil = await this.usersRepository.find();
        console.log(hasil)
        return hasil
    }

    async findOneBy(idUser: number): Promise<any> {
        const hasil = await this.usersRepository.findOne({
            where: {
                idUser: idUser
            }
        })
        console.log(hasil)
        return hasil
    }
    async findOneUsersWithUsername(username: any){
        // console.log(username.username);
        return await this.usersRepository.findOne({
          where: { username: username },
        });
      }
    async createUsers(data: Users): Promise<any> {
        const addData = await this.usersRepository.save({
            idUser: data.idUser,
            username: data.username,
            passwords: data.passwords
        })
        if (addData) {
            return { message: 'Data behasil ditambahkan' , addData:addData};
        } else {
            return { message: 'Data gagal ditambahkan' };
        }
    }

    async updateUsers(idUser: number, data: Users) {
        const result = await this.usersRepository.update(
            {
                idUser: idUser,
            },
            {
                username: data.username,
                passwords: data.passwords,
            },
        );

        const getNewData = await this.usersRepository.findOne({
            where: { idUser: idUser },
        });
        if (result.affected) {
            return getNewData;
        } else {
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        }
    }
    async deleteUsers(idUser: number) {
        const result = await this.usersRepository.delete({
            idUser: idUser,
        });

        if (result.affected) {
            return { message: 'Data berhasil dihapus' };
        } else {
            throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        }
    }
}
