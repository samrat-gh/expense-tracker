# Prisma Schema Documentation

This expense tracker application uses **Prisma ORM** with **MongoDB** for data persistence.

## Schema Overview

### Models (Collections)

#### 1. **User**
Extended user data beyond Clerk authentication.
- `clerkId`: Unique link to Clerk user
- `email`, `name`: User information
- `currency`: Default currency (ISO code)
- `timezone`: User timezone
- Relations: accounts, transactions, categories, budgets, goals, invoices, settings

#### 2. **Account**
Financial accounts (bank accounts, credit cards, cash, etc.)
- `type`: checking, savings, credit_card, cash, investment
- `balance`: Stored in smallest currency unit (cents)
- `institutionName`: Bank or institution name
- `accountNumber`: Last 4 digits for reference
- `isActive`: Boolean flag for active/inactive accounts

#### 3. **Category**
Income and expense categories with support for subcategories
- `type`: income or expense
- `parentCategoryId`: For creating hierarchical categories
- `isSystem`: System categories cannot be deleted
- `color`, `icon`: Visual customization
- Self-referential relation for parent/subcategories

#### 4. **Transaction**
Individual financial transactions
- `type`: income, expense, or transfer
- `amount`: Stored in smallest currency unit
- `isRecurring`: Flag for recurring transactions
- `tags`: String array for custom tags
- `attachments`: String array of file URLs (receipts, etc.)
- Relations: user, account, category, invoice, recurringTemplate

#### 5. **RecurringTransaction**
Templates for automatic transaction generation
- `frequency`: daily, weekly, monthly, yearly
- `interval`: Every X periods
- `startDate`, `endDate`: Transaction schedule
- `nextDue`: Next generation date
- `lastGenerated`: Last time a transaction was created

#### 6. **Budget**
Budget tracking per category and time period
- `period`: weekly, monthly, yearly
- `alertThreshold`: Percentage to trigger alerts (default 80%)
- `amount`: Budget limit in cents
- Relations: user, category

#### 7. **Goal**
Financial goals and savings targets
- `targetAmount`, `currentAmount`: Goal tracking
- `priority`: low, medium, high
- `status`: active, completed, paused, cancelled
- `targetDate`: Optional goal deadline

#### 8. **Invoice**
Invoice generation and tracking
- `invoiceNumber`: Unique identifier
- `items`: Array of InvoiceItem (embedded type)
- `status`: draft, sent, paid, overdue, cancelled
- `taxRate`: Stored as percentage * 100 (15.5% = 1550)
- `subtotal`, `taxAmount`, `totalAmount`: Calculations
- Relations: user, transactions

#### 9. **InvoiceItem** (Composite Type)
Line items embedded in Invoice
- `description`: Item description
- `quantity`: Number of items
- `unitPrice`: Price per item in cents
- `amount`: Total amount in cents

#### 10. **PaymentMethod**
Stored payment methods
- `type`: credit_card, debit_card, paypal, etc.
- `lastFour`: Last 4 digits
- `expiryMonth`, `expiryYear`: Card expiration
- `isDefault`: Flag for default payment method

#### 11. **Tag**
Custom tags for transaction organization
- Reusable across transactions
- Unique per user (composite unique constraint)
- Visual customization with colors

#### 12. **UserSettings**
User preferences and configuration (1:1 with User)
- `theme`: light, dark, system
- `notifications`: JSON object for preferences
- `dateFormat`: Display format
- `firstDayOfWeek`: Calendar configuration (0 = Sunday)
- `emailNotifications`: Boolean flag

## Money Storage

All monetary values are stored as **integers in the smallest currency unit** (cents for USD, pence for GBP, etc.). This avoids floating-point precision issues.

Example:
- $10.50 → stored as 1050
- $100.00 → stored as 10000

## Relations

Prisma relations with proper cascading:
- **Cascade**: Delete related records when parent is deleted (most relations)
- **Restrict**: Prevent deletion if related records exist (categories with transactions)
- **SetNull**: Set to null when parent is deleted (optional relations)

## Installation

Install Prisma and generate client:

```bash
pnpm add @prisma/client
pnpm add -D prisma
```

## Setup

1. Create a MongoDB database (MongoDB Atlas recommended)
2. Copy `.env.example` to `.env.local`
3. Add your `DATABASE_URL`
4. Generate Prisma Client:

```bash
pnpx prisma generate
```

5. (Optional) Push schema to database:

```bash
pnpx prisma db push
```

## Usage Examples

### Initialize Prisma Client

```typescript
import { prisma } from "@/lib/prisma";
```

### Querying Transactions with Relations

```typescript
// Get user transactions with account and category details
const transactions = await prisma.transaction.findMany({
  where: {
    userId: userId,
  },
  include: {
    account: true,
    category: true,
    invoice: true,
  },
  orderBy: {
    date: "desc",
  },
  take: 50,
});
```

### Creating a Transaction

```typescript
const newTransaction = await prisma.transaction.create({
  data: {
    userId: userId,
    accountId: accountId,
    categoryId: categoryId,
    type: "expense",
    amount: 5000, // $50.00
    currency: "USD",
    description: "Grocery shopping",
    date: new Date(),
    payee: "Whole Foods",
    tags: ["groceries", "food"],
  },
});
```

### Creating a User with Settings

```typescript
const user = await prisma.user.create({
  data: {
    clerkId: clerkUserId,
    email: "user@example.com",
    name: "John Doe",
    currency: "USD",
    settings: {
      create: {
        theme: "dark",
        language: "en",
        emailNotifications: true,
      },
    },
  },
  include: {
    settings: true,
  },
});
```

### Calculating Account Balance with Aggregation

```typescript
const incomeTotal = await prisma.transaction.aggregate({
  where: {
    accountId: accountId,
    type: "income",
  },
  _sum: {
    amount: true,
  },
});

const expenseTotal = await prisma.transaction.aggregate({
  where: {
    accountId: accountId,
    type: "expense",
  },
  _sum: {
    amount: true,
  },
});

const balance = (incomeTotal._sum.amount || 0) - (expenseTotal._sum.amount || 0);
```

### Creating an Invoice with Items

```typescript
const invoice = await prisma.invoice.create({
  data: {
    userId: userId,
    invoiceNumber: "INV-2026-001",
    clientName: "Acme Corp",
    clientEmail: "billing@acme.com",
    issueDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    items: [
      {
        description: "Web Development Services",
        quantity: 40,
        unitPrice: 5000, // $50.00 per hour
        amount: 200000, // $2000.00
      },
      {
        description: "Hosting Setup",
        quantity: 1,
        unitPrice: 50000, // $500.00
        amount: 50000,
      },
    ],
    subtotal: 250000, // $2500.00
    taxRate: 1000, // 10%
    taxAmount: 25000, // $250.00
    totalAmount: 275000, // $2750.00
    status: "draft",
  },
});
```

### Finding Categories with Subcategories

```typescript
const categories = await prisma.category.findMany({
  where: {
    userId: userId,
    parentCategoryId: null, // Only root categories
  },
  include: {
    subcategories: true,
  },
});
```

## Prisma Studio

View and edit your database with Prisma Studio:

```bash
pnpx prisma studio
```

This opens a visual interface at `http://localhost:5555` where you can browse and edit your data.

## Type Safety

Prisma provides full TypeScript support:

```typescript
import type { Transaction, Prisma } from "@prisma/client";

// Transaction with relations
type TransactionWithRelations = Prisma.TransactionGetPayload<{
  include: { account: true; category: true };
}>;

// Create input type
type TransactionCreateInput = Prisma.TransactionCreateInput;
```

## Database Commands

```bash
# Generate Prisma Client after schema changes
pnpx prisma generate

# Push schema to database (development)
pnpx prisma db push

# Create a migration (production)
pnpx prisma migrate dev --name init

# Deploy migrations (production)
pnpx prisma migrate deploy

# Reset database (WARNING: deletes all data)
pnpx prisma db push --force-reset

# Open Prisma Studio
pnpx prisma studio

# Format schema file
pnpx prisma format
```

## Migration Strategy

For production:
1. Make schema changes
2. Run `pnpx prisma migrate dev --name description_of_change`
3. Commit migration files to git
4. Deploy with `pnpx prisma migrate deploy`

For development:
- Use `pnpx prisma db push` for rapid iteration
- No migration files created
- Faster feedback loop

## Future Enhancements

Potential additions to consider:
- **Notification** model: Transaction alerts and reminders
- **SharedBudget** model: Multi-user budget tracking
- **Report** model: Saved custom reports
- **AuditLog** model: Track changes to financial data
- **Attachment** model: Separate collection for file metadata with detailed metadata
