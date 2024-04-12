"use server";

import { getUserByEmail } from "../../data/user";
import * as z from "zod";
import { sendPasswordResetEmail } from "./mail";
import { generatePasswordResetToken } from "./tokens";

const ResetSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
});

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid email!" }; 
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser){
        return { error: "Email not found "};
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken?.email,
        passwordResetToken?.token,
    );

    return { success: "Reset email sent! "};

}