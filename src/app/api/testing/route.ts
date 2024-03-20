import { db } from "@/lib/db";

export default async function doSomething(){

    await db.user.delete({
        where:{
            email: "dhruvnaik21@gmail.com"
        }
    });
}