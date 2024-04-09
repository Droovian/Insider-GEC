import { db } from "@/lib/db";

export default async function doSomething() {
    try {
        await db.user.delete({
            where:{
                email: 'dhruvnaik21@gmail.com'
            }
        });
        console.log("All posts have been deleted successfully.");
    } catch (error) {
        console.error("Error occurred while deleting posts:", error);
    }
}