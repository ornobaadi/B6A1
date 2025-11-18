# TypeScript Interview Questions - Blog Posts

## Blog Post 1: TypeScript এ Interface আর Type এর মধ্যে পার্থক্য

TypeScript নিয়ে কাজ করতে গেলে Interface আর Type - এই দুটো concept এর সাথে পরিচিত হতেই হয়। প্রথমদিকে অনেকেই confused হন যে কোনটা কখন ব্যবহার করবেন। আজকে এই confusion clear করার চেষ্টা করবো practical examples এর মাধ্যমে।

### Declaration Merging - Interface এর বিশেষ ক্ষমতা

Interface এর একটি গুরুত্বপূর্ণ বৈশিষ্ট্য হলো Declaration Merging। একই নামে একাধিকবার interface declare করলে TypeScript সেগুলো merge করে একটি interface বানায়।

```typescript
interface User {
  name: string;
  email: string;
}

// পরবর্তীতে নতুন property যোগ করা
interface User {
  age: number;
  phone?: string;
}

// TypeScript দুটো declaration merge করে দেয়
const newUser: User = {
  name: "কামাল আহমেদ",
  email: "kamal@example.com",
  age: 30,
  phone: "01711223344"
};
```

Type alias এর ক্ষেত্রে এটি সম্ভব নয়। একবার declare করার পর আর modify করা যায় না।

```typescript
type Customer = {
  name: string;
  email: string;
};

// Error: Duplicate identifier 'Customer'
type Customer = {
  age: number;
};
```

### Union এবং Intersection Types

Type alias এর সুবিধা হলো union (|) এবং intersection (&) operators ব্যবহার করে complex types তৈরি করা যায়।

```typescript
// Union Type - একাধিক type এর যেকোনো একটি
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

let userId: ID = "USR123";
userId = 123;  // দুটোই valid

// Intersection Type - একাধিক type এর combination
type PersonalInfo = {
  name: string;
  dateOfBirth: Date;
};

type ContactInfo = {
  email: string;
  phone: string;
};

type Employee = PersonalInfo & ContactInfo & {
  employeeId: string;
  department: string;
};
```

Interface এর ক্ষেত্রে extends keyword ব্যবহার করে similar কাজ করা যায়, তবে syntax টা আলাদা।

```typescript
interface BasicInfo {
  name: string;
  age: number;
}

interface WorkInfo extends BasicInfo {
  company: string;
  designation: string;
}
```

### Tuple এবং Primitive Type Aliases

Type alias দিয়ে tuple এবং primitive types define করা যায়, যা interface দিয়ে সম্ভব নয়।

```typescript
// Tuple type
type Coordinates = [number, number];
type RGB = [number, number, number];

const location: Coordinates = [23.8103, 90.4125];
const color: RGB = [255, 128, 0];

// Primitive type aliases
type Username = string;
type Age = number;
type IsActive = boolean;
```

### Function Signatures

Function type define করার জন্য দুটোই ব্যবহার করা যায়, তবে syntax ভিন্ন।

```typescript
// Type alias দিয়ে
type Calculate = (x: number, y: number) => number;

// Interface দিয়ে
interface Calculator {
  (x: number, y: number): number;
}

const add: Calculate = (x, y) => x + y;
const multiply: Calculator = (x, y) => x * y;
```

### Class Implementation

Class implement করার সময় interface বেশি ব্যবহার করা হয়।

```typescript
interface Driveable {
  speed: number;
  accelerate(): void;
  brake(): void;
}

interface Electric {
  batteryCapacity: number;
  charge(): void;
}

// Multiple interfaces implement করা
class TeslaModel3 implements Driveable, Electric {
  speed = 0;
  batteryCapacity = 75;

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed = Math.max(0, this.speed - 10);
  }

  charge() {
    console.log("Charging battery...");
  }
}
```

### কোনটি কখন ব্যবহার করবেন?

আমার অভিজ্ঞতা থেকে কিছু guideline:

**Interface ব্যবহার করুন যখন:**
- Object structure define করতে হবে
- Class এর contract define করতে হবে
- Library বা API এর types define করতে হবে (extensibility এর জন্য)
- Object-oriented programming pattern follow করছেন

**Type ব্যবহার করুন যখন:**
- Union অথবা intersection types দরকার
- Tuple define করতে হবে
- Primitive type এর alias দরকার
- Complex utility types তৈরি করতে হবে
- Function signatures define করতে হবে