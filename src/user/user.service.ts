import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel('users') private readonly userModal: Model<User>) {console.log("userSerive");
   };

  async create(createUserDto: CreateUserDto) {
    const oldUser = await this.findOneByUsername(createUserDto.username);
    
    if(oldUser){
      throw new BadRequestException('User exists already',);
    }
    createUserDto.role = Role.Admin;
    var user = new this.userModal(createUserDto);

    return await user.save();
  }

  async findAll() {
    return {
      "list" : await this.userModal.find()
    };
  }

  findOne(id: string) {
    return this.userModal.findById(id);
  }

  findOneByUsername(username: string) {
    return this.userModal.findOne({
      "username": username
    }).select("id password role");
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    var option = { 'new': true };
    return this.userModal.findByIdAndUpdate(id, updateUserDto, option);
  }

  remove(id: string) {
    return this.userModal.findByIdAndDelete(id);
  }
}
