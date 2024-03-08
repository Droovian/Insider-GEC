import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod";

// Creating a schema for input validation

const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid Email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have 10 characters'),
})

export async function POST(req: Request){
    try{
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        const checkExistingUser = await db.user.findUnique({ // checking if user already exists
            where: {
                username: username
            }
        });

        if(checkExistingUser){
            return NextResponse.json({
                message: "User already exists with the entered Email",
            }, {
                status: 409
            })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        const { password: newUserPassword , ...rest } = newUser;

        return NextResponse.json({
            user: rest,
            message: "User registered successfully"
        },
        {
            status: 201
        });
    }
    catch(error){
        return NextResponse.json({
            message: "Something went wrong!"
        },
        {
            status: 500
        })
    }
}