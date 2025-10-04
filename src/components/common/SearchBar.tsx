import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search..." />
            <Button type="submit">
                <Search className="h-4 w-4 mr-2" /> Search
            </Button>
        </div>
    );
}