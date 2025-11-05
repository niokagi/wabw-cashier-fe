import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen w-full bg-background gap-4 text-center px-4">
                <h1 className="text-6xl font-bold text-primary">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-foreground">
                    Page Not Found
                </h2>
                <p className="text-base text-muted-foreground max-w-md">
                    Sorry, we couldn't find the page you're looking for.
                    It might have been moved, deleted, or perhaps never existed.
                </p>
                <Button asChild className="mt-4">
                    <Link to="/">Go Back Home</Link>
                </Button>
            </div>
        </>
    );
}