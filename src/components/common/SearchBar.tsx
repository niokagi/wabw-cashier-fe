import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Field } from "../ui/field";
import { useState } from "react";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    // test submit val
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Field orientation={"horizontal"} className="border bg-gray-100 rounded-full p-1">
                <Input type="text" placeholder="Search..." className="border-none shadow-none focus:border-none focus-visible:ring-0" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button type="submit" className="bg-gray-400 hover:bg-gray-500 text-white rounded-full h-9 w-9">
                    <Search />
                </Button>
            </Field>
        </form>
    );
}