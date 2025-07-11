'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db';

export async function editSnippet(id: number, code: string) {
    console.log(id, code);
    await db.snippet.update({
        where: { id },
        data: { code }
    });

    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number){
    await db.snippet.delete({
        where: { id }
    });

    revalidatePath('/');
    redirect('/');
}

export async function createSnippet(formState: {message: string}, formData: FormData) {
    try {
        // Check user's inputs to make sure they are valid
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;
    
        if (typeof title !== 'string' || title.length < 3){
            return {
                message: 'Title must be longer',
            };
        }
    
        if (typeof code !== 'string' || code.length < 10){
            return {
                message: 'Code must be longer',
            };
        }

        // Create a new record in the database
        await db.snippet.create({
            data: {
                title,
                code
            }
        });
    }
    catch (err: unknown) {
        if (err instanceof Error){
            return {
                message: err.message,
            }
        } else {
            return {
                message: 'Something went wrong...',
            }
        }
    }

    revalidatePath('/');

    // Redirect the user back to the root route
    redirect('/');
}