/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {

    private supabaseClient: SupabaseClient
    constructor() {
        this.supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    }

    async createRole(addRoleDto: AddRoleDto) {
        const { data, error } = await this.supabaseClient
            .from('role')
            .insert({
            name: addRoleDto.name
            })
        if (error) {
            throw new Error(error.message);
        }
        return {
            data: data
        }
    }
}
