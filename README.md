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

---

## Blog Post 2: TypeScript এর any, unknown এবং never Types এর পার্থক্য

TypeScript এ তিনটি special type আছে যা প্রথমে বুঝতে একটু কঠিন মনে হতে পারে। এই types গুলো সঠিকভাবে ব্যবহার করলে code এর type safety অনেক improve হয়।

### any Type - Type Checking এর বাইরে

`any` type ব্যবহার করলে TypeScript এর type checking বন্ধ হয়ে যায়। যেকোনো value assign করা যায় এবং যেকোনো operation করা যায়।

```typescript
let value: any = 42;
value = "Hello";
value = true;
value = { name: "Test" };

// কোন error দেখাবে না, কিন্তু runtime এ crash করতে পারে
value.toUpperCase();
value.someNonExistentMethod();
```

**কখন ব্যবহার করবেন:**
- Legacy JavaScript code TypeScript এ migrate করার সময়
- Third-party library যার type definitions নেই
- Temporary workaround হিসেবে (পরে refactor করার plan থাকলে)

**সমস্যা:**
```typescript
function processData(data: any) {
  // Type safety নেই, bugs হওয়ার সম্ভাবনা বেশি
  return data.name.toUpperCase() + data.age;
}

// Runtime error হবে যদি data তে name বা age না থাকে
processData({ firstName: "John" });
```

### unknown Type - Safe Alternative to any

`unknown` type এ যেকোনো value assign করা যায়, কিন্তু ব্যবহার করার আগে type check করতে হয়।

```typescript
let userInput: unknown = getUserInput();

// Direct access করা যাবে না
// console.log(userInput.name);  // Error!

// Type narrowing করে ব্যবহার করতে হবে
if (typeof userInput === 'string') {
  console.log(userInput.toUpperCase());
}

if (typeof userInput === 'object' && userInput !== null) {
  // Type assertion বা type guard ব্যবহার করা
  if ('name' in userInput) {
    console.log(userInput.name);
  }
}
```

**Practical Example - API Response Handling:**
```typescript
interface ApiResponse {
  data: unknown;
  status: number;
}

async function fetchUserData(): Promise<ApiResponse> {
  const response = await fetch('/api/user');
  const data = await response.json();
  
  return {
    data,  // unknown type
    status: response.status
  };
}

// Type guard function
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  );
}

// Safe usage
async function handleUserData() {
  const { data, status } = await fetchUserData();
  
  if (status === 200 && isUser(data)) {
    // এখন data User type হিসেবে ব্যবহার করা যাবে
    console.log(`User: ${data.name} (${data.email})`);
  }
}
```

### never Type - Unreachable Code

`never` type represent করে এমন values যা কখনোই occur হবে না। তিনটি প্রধান use case:

**1. Functions that never return:**
```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // Process continues forever
  }
}
```

**2. Exhaustive Type Checking:**
```typescript
type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

function handlePaymentStatus(status: PaymentStatus): string {
  switch(status) {
    case 'pending':
      return 'Payment is being processed';
    case 'completed':
      return 'Payment successful';
    case 'failed':
      return 'Payment failed';
    case 'refunded':
      return 'Payment has been refunded';
    default:
      // TypeScript ensures all cases are handled
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status: ${exhaustiveCheck}`);
  }
}
```

**3. Conditional Types:**
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Result1 = NonNullable<string | null>;  // string
type Result2 = NonNullable<null>;          // never
```

### Comparison এবং Best Practices

**Type Safety Comparison:**
```typescript
// ❌ Bad: any defeats type safety
function riskyFunction(input: any) {
  return input.toLowerCase();  // No compile-time error
}

// ✅ Good: unknown enforces type checking
function safeFunction(input: unknown) {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }
  throw new Error('Input must be a string');
}

// ✅ Best: Specific types when possible
function bestFunction(input: string) {
  return input.toLowerCase();
}
```

**Real-world Scenario - Error Handling:**
```typescript
class CustomError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
  }
}

async function apiCall<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(endpoint);
    
    if (!response.ok) {
      // never return type
      throwApiError(response.status);
    }
    
    // unknown থেকে generic type T তে convert
    const data: unknown = await response.json();
    return data as T;
    
  } catch (error: unknown) {
    // Error handling with unknown
    if (error instanceof CustomError) {
      console.error(`API Error ${error.code}: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`Unexpected error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    throw error;
  }
}

function throwApiError(status: number): never {
  switch(status) {
    case 404:
      throw new CustomError('Resource not found', 'NOT_FOUND', 404);
    case 401:
      throw new CustomError('Unauthorized', 'UNAUTHORIZED', 401);
    default:
      throw new CustomError('API Error', 'API_ERROR', status);
  }
}
```

### Summary

এই তিনটি type এর ব্যবহার সংক্ষেপে:

| Type | Use Case | Type Safety | Best For |
|------|----------|-------------|----------|
| `any` | Quick fixes, migrations | None | Legacy code integration |
| `unknown` | Dynamic values | Required type checking | API responses, user input |
| `never` | Unreachable code | Maximum | Error handling, exhaustive checks |

**Key Takeaways:**
- `any` এর ব্যবহার যতটা সম্ভব এড়িয়ে চলুন
- Dynamic data এর জন্য `unknown` ব্যবহার করুন এবং proper type guards লিখুন
- `never` দিয়ে exhaustive checking ensure করুন
- Type safety maintain করলে runtime errors অনেক কমে যায়

TypeScript এর strength হলো এর type system। এই special types গুলো সঠিকভাবে ব্যবহার করলে আপনার code আরো maintainable এবং bug-free হবে।