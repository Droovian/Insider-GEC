import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export default async function GET(req:Request){

    try{
    const fetchData = await db.post.findMany();

    console.log(fetchData);

    return NextResponse.json({
        message: "Successfully fetched data"
    })
    }
    catch(error){
        return NextResponse.json({
            message: "Failed to fetch data"
        })
    }
}