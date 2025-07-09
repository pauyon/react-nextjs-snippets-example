import { redirect } from 'next/navigation';
import { db } from "@/db"

export default function SnippetCreatePage() {

    async function createSnippet(formData: FormData) {
        // Needs to be server action
        'use server'; // this string tells nextjs to treat this as server action

        // Check user's inputs to make sure they are valid
        const title = formData.get('title') as string;
        const code = formData.get('code') as string;

        // Create a new record in the database
        const snippet = await db.snippet.create({
            data: {
                title,
                code
            }
        });

        // Redirect the user back to the root route
        redirect('/');
    }

    return (
        <form action={createSnippet}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <label htmlFor="title" className="w-12">Title</label>
                    <input name="title" className="border rounder p-2 w-full" />
                </div>
                <div className="flex gap-4">
                    <label htmlFor="code" className="w-12">Code</label>
                    <textarea name="code" className="border rounder p-2 w-full" />
                </div>
                <button type="submit" className="rounder p-2 bg-blue-200">Create</button>
            </div>
        </form>
    )
}