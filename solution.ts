function formatValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else if (typeof value === "number") {
        return value * 10;
    } else {
        return !value;
    }
}

function getLength(value: string | any[]): number {
    if (typeof value === "string") {
        return value.length;
    } else if (Array.isArray(value)) {
        return value.length;
    }
    return 0;
}

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return `'Name: ${this.name}, Age: ${this.age}'`;
    }
}

type Item = {
    title: string;
    rating: number;
};
function filterByRating(items: Item[]): Item[] {
    return items.filter((item) => item.rating >= 4);
}

type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

function filterActiveUsers(users: User[]): User[] {
    return users.filter((user) => user.isActive === true);
}

type Book = {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

function printBookDetails(book: Book): void {
    const availability = book.isAvailable ? "Yes" : "No";
    console.log(
        `Title: ${book.title}, Author: ${book.author}, Published Year: ${book.publishedYear}, Available: ${availability}`
    );
}

function getUniqueValues(
    arr1: (string | number)[],
    arr2: (string | number)[]
): (string | number)[] {
    const combined = [...arr1, ...arr2];
    const unique: (string | number)[] = [];

    for (let i = 0; i < combined.length; i++) {
        if (!unique.includes(combined[i])) {
            unique.push(combined[i]);
        }
    }
    return unique;
}

type Product = {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

function calculateTotalPrice(products: Product[]): number {
    if (products.length === 0) return 0;

    const total = products
        .map((product) => {
            const basePrice = product.price * product.quantity;
            if (product.discount !== undefined) {
                return basePrice - (basePrice * product.discount) / 100;
            }
            return basePrice;
        })
        .reduce((total, price) => total + price, 0);
    return total;
}