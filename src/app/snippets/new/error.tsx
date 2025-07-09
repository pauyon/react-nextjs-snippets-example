'use client'; // error page MUST be client component

interface ErrorPageProps {
    error: Error,
    reset: () => void;
}

export default function ErrorPage({ error }: ErrorPageProps) {
    return ( 
        <div>
            {error.message}
        </div>
    );
}

