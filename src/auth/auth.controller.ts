/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SupabaseAuthGuard } from "./guards/supabase-auth-guard";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('auth')
@ApiTags('authentication')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Get('test')
    @UseGuards(SupabaseAuthGuard)
    @ApiBearerAuth('access-token')
    async test(@Headers() headers){
        const x = 1
        return true
    }

    @Post('sigIn')
    @ApiOperation({
        summary: 'Acquires an access token',
        description: 'This endpoint will provide an access token.'
    })
    async signIn(@Body() loginUserDto: LoginUserDto) {
        return this.authService.signIn(loginUserDto)
    }

    @Get('getUsers')
    @ApiOperation({
        summary: 'Get all user',
        description: 'This endpoint will get all user from database.'
    })
    async getUsers(){
        return this.authService.getUsers()
    }

    @Post('createUser')
    @ApiOperation({
        summary: 'Signs up the user in the system',
        description: 'This endpoint signs up the user in the system. It will return the user details. You will use this user to interact with the rest of the endpoints.'
    })
    async createUser(@Body() dto: CreateUserDto ){
        return this.authService.createUser(dto)
    }
}