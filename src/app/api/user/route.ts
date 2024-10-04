import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as z from "zod";

const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(100),
})

export async function POST(req: Request){
    try{
        const body = await req.json();
        const {  username } = userSchema.parse(body);

        if(!username){
            return NextResponse.json({
                message: "Username is required"
            },
            {
                status: 400
            });
        }

        return NextResponse.json({
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