import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export default function ProductsList() {
    const dummyData = [
        {
            id: 1,
            title: "Classic Bruschetta",
            desc: "Grilled bread topped with fresh tomatoes, garlic, basil, and a hint of balsamic glaze.",
            price: 8.99,
            category: "Appetizer"
        },
        {
            id: 2,
            title: "Spaghetti Carbonara",
            desc: "A creamy pasta dish made with egg, hard cheese, cured pork, and black pepper.",
            price: 15.50,
            category: "Main Course"
        },
        {
            id: 3,
            title: "Grilled Ribeye Steak",
            desc: "A 12oz prime ribeye, seasoned and grilled to perfection, served with mashed potatoes.",
            price: 29.95,
            category: "Main Course"
        },
        {
            id: 4,
            title: "Margherita Pizza",
            desc: "Classic Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.",
            price: 14.00,
            category: "Main Course"
        },
        {
            id: 5,
            title: "Lemon Herb Salmon",
            desc: "Pan-seared salmon fillet with a lemon-dill sauce, served with quinoa and asparagus.",
            price: 22.00,
            category: "Main Course"
        },
        {
            id: 6,
            title: "Chicken Caesar Salad",
            desc: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing, topped with grilled chicken.",
            price: 13.75,
            category: "Salad"
        },
        {
            id: 7,
            title: "Chocolate Lava Cake",
            desc: "Warm chocolate cake with a molten center, served with a scoop of vanilla ice cream.",
            price: 9.50,
            category: "Dessert"
        },
        {
            id: 8,
            title: "New York Cheesecake",
            desc: "Creamy and dense cheesecake with a graham cracker crust, topped with a strawberry compote.",
            price: 9.00,
            category: "Dessert"
        },
    ]

    return (<>
        <div className="flex flex-1 flex-col gap-4 w-full">
            <div className="product-card-container p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dummyData.map(data => (
                    <Card className="gap-3 border-none" key={data.title}>
                        <CardHeader>
                            <Skeleton className="h-[9rem] sm:h-[7rem] w-[100%] rounded-lg z-[0]" />
                            <CardTitle className="mt-3">{data.title}</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription> */}
                            {/* <CardAction>Card Action</CardAction> */}
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-gray-500 truncate">{data.desc}</p>
                        </CardContent>
                        <CardFooter>
                            <p>${data.price}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </>)
}