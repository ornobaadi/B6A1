// Problem 1
function formatValue(value: string | number | boolean): string | number | boolean {
    if (typeof value === "string") {
        return value.toUpperCase();
    } else if (typeof value === "number") {
        return value * 10;
    } else {
        return !value;
    }
}
console.log(formatValue('hello'));
console.log(formatValue(5));
console.log(formatValue(true));

// Problem 2
function getLength(value: string | any[]): number {
    if (typeof value === "string") {
        return value.length;
    } else if (Array.isArray(value)) {
        return value.length;
    }
    return 0;
}

console.log(getLength('typescript'));
console.log(getLength([10, 20, 30, 40]));

// Problem 3
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

const person1 = new Person('John Doe', 30);
console.log(person1.getDetails());

const person2 = new Person('Alice', 25);
console.log(person2.getDetails());


// Problem 4
type Item = {
    title: string;
    rating: number;
};
function filterByRating(items: Item[]): Item[] {
    return items.filter((item) => item.rating >= 4);
}

const books = [
    { title: 'Book A', rating: 4.5 },
    { title: 'Book B', rating: 3.2 },
    { title: 'Book C', rating: 5.0 },
];

console.log(filterByRating(books));

// Problem 5
type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

function filterActiveUsers(users: User[]): User[] {
    return users.filter((user) => user.isActive === true);
}

const users = [
    { id: 1, name: 'Rakib', email: 'rakib@example.com', isActive: true },
    { id: 2, name: 'Asha', email: 'asha@example.com', isActive: false },
    { id: 3, name: 'Rumi', email: 'rumi@example.com', isActive: true },
];

console.log(filterActiveUsers(users));

// Problem 6
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

const myBook: Book = {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
    isAvailable: true,
};

printBookDetails(myBook);

// Problem 7
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

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(getUniqueValues(array1, array2));

// Problem 8
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

const products = [
    { name: 'Pen', price: 10, quantity: 2 },
    { name: 'Notebook', price: 25, quantity: 3, discount: 10 },
    { name: 'Bag', price: 50, quantity: 1, discount: 20 },
];

console.log(calculateTotalPrice(products));