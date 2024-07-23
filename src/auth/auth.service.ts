import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {

    private supabaseClient: SupabaseClient
    constructor() {
        this.supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY,
        )
    }

    async signIn(loginUserDto: LoginUserDto) {
        const { data, error } = await this.supabaseClient.auth.signInWithPassword({
            email: loginUserDto.email,
            password: loginUserDto.password,
        });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async createUser(dto: CreateUserDto) {
        const { data, error } = await this.supabaseClient.auth.admin.createUser(
            {
                email: dto.email,
                password: dto.password,
                user_metadata: dto.userMetadata,
                email_confirm: true
            }
        )

        return {
            data: data,
            error: error
        }
    }

    async getUsers() {
        const { data: { users }, error } = await this.supabaseClient.auth.admin.listUsers()
        return {
            data: users,
            error: error
        }
    }

}