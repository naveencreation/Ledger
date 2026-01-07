## Debit–Credit Transaction Web Application

---

## 1. Product Overview

### 1.1 Product Name (Working)

**LedgerLite** (placeholder)

### 1.2 Product Vision

To build a **simple, reliable, and extensible web-based debit–credit transaction system** that allows users to record, store, and view financial transactions through structured forms, backed by a SQL database and a modern web UI.

The system should:

* Be **easy to install locally**
* Maintain **clean financial data integrity**
* Scale from a **personal tool → small business ledger → SaaS-ready system**

---

## 2. Target Users

### Primary Users

* Individuals managing basic finances
* Small business owners
* Accountants / finance teams (entry-level usage)

### Secondary Users (Future)

* Auditors
* Admin users
* Multi-tenant SaaS customers

---

## 3. Technology Stack

### Frontend

* **React**
* **Vite**
* **TypeScript**
* **shadcn/ui**
* Tailwind CSS

### Backend

* **FastAPI**
* Python 3.10+

### Database

* **SQLite** (initial)
* Designed for future migration to PostgreSQL

### Communication

* REST APIs (JSON)
* Axios / Fetch

---

## 4. High-Level System Architecture

<pre class="overflow-visible! px-0!" data-start="1504" data-end="1695"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>[ Browser (React + shadcn) ]</span><span>
            |
            | </span><span>REST</span><span></span><span>API</span><span> (JSON)
            |
</span><span>[ FastAPI Backend ]</span><span>
            |
            | </span><span>SQLAlchemy</span><span></span><span>ORM</span><span>
            |
</span><span>[ SQLite Database ]</span><span>
</span></span></code></div></div></pre>

---

## 5. Installation & Setup Requirements

### 5.1 Prerequisites

* Node.js ≥ 18
* Python ≥ 3.10
* Git
* pip / virtualenv

---

### 5.2 Backend Setup Flow

1. Clone repository
2. Create Python virtual environment
3. Install dependencies
4. Initialize database
5. Start FastAPI server

**Expected Outcome**

* Backend running at `http://localhost:8000`
* Swagger UI available at `/docs`

---

### 5.3 Frontend Setup Flow

1. Navigate to frontend folder
2. Install npm dependencies
3. Configure API base URL
4. Start Vite dev server

**Expected Outcome**

* Frontend running at `http://localhost:5173`
* Forms can submit data to backend

---

## 6. Functional Requirements

---

## 6.1 Transaction System (Core)

### Definition

Every financial record is treated as a **Transaction** with a type:

* `CREDIT` → money coming in
* `DEBIT` → money going out

### Core Transaction Attributes

| Field            | Description           |
| ---------------- | --------------------- |
| id               | Unique transaction ID |
| type             | DEBIT or CREDIT       |
| amount           | Numeric amount        |
| payment_mode     | Cash / Cheque         |
| reference_number | Receipt / Voucher     |
| date             | Auto-generated        |
| notes            | Optional              |

---

## 6.2 Credit Entry Module

### User Inputs

* Name
* Amount
* Towards
* Payment Mode
  * Cash
  * Cheque (Cheque Number required)
* Receipt Number
* Optional Notes

### Backend Behavior

* Create base transaction with type `CREDIT`
* Store credit-specific details in related table
* Ensure atomic insertion

---

## 6.3 Debit Entry Module

### User Inputs

* Purpose
* Amount
* Payment Mode
* Voucher Number
* Optional Notes

### Backend Behavior

* Create base transaction with type `DEBIT`
* Store debit-specific details in related table
* Ensure atomic insertion

---

## 6.4 Ledger View Module

### Features

* Unified list of debit & credit transactions
* Sorting by date
* Filter by:
  * Type
  * Date range
* Visual distinction:
  * Credit → Green
  * Debit → Red

### Columns

* Date
* Type
* Name / Purpose
* Amount
* Payment Mode
* Reference Number

---

## 7. Database Requirements

### 7.1 Tables

#### transactions

Stores common transaction data.

#### credit_details

Stores credit-only fields.

#### debit_details

Stores debit-only fields.

### 7.2 Data Integrity Rules

* Amount must be > 0
* Transaction must exist before details are added
* Cheque number required only if payment mode is cheque

---

## 8. API Requirements

### Credit APIs

<pre class="overflow-visible! px-0!" data-start="4092" data-end="4116"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>POST /api/credit
</span></span></code></div></div></pre>

### Debit APIs

<pre class="overflow-visible! px-0!" data-start="4133" data-end="4156"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>POST /api/debit
</span></span></code></div></div></pre>

### Ledger APIs

<pre class="overflow-visible! px-0!" data-start="4174" data-end="4269"><div class="contain-inline-size rounded-2xl corner-superellipse/1.1 relative bg-token-sidebar-surface-primary"><div class="sticky top-[calc(--spacing(9)+var(--header-height))] @w-xl/main:top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>GET</span><span> /api/transactions
</span><span>GET</span><span> /api/transactions?</span><span>type</span><span>=CREDIT
</span><span>GET</span><span> /api/transactions?</span><span>from</span><span>=&</span><span>to</span><span>=
</span></span></code></div></div></pre>

---

## 9. Frontend UI Requirements

### Design Principles

* Minimal
* Clean
* Accounting-friendly
* No visual clutter

### UI Components (shadcn)

* Card
* Input
* Select
* RadioGroup
* Button
* Table
* Dialog

---

## 10. Validation Rules

### Frontend

* Required field validation
* Conditional fields (Cheque Number)
* Numeric validation for amount

### Backend

* Pydantic validation
* Database-level constraints
* Proper error messages

---

## 11. Non-Functional Requirements

### Performance

* API response < 300ms (local)
* SQLite optimized queries

### Reliability

* Atomic DB transactions
* Rollback on failure

### Security (Initial Phase)

* No auth required (local usage)
* Input sanitization
* Prepared SQL queries via ORM

---

## 12. Future Enhancements (Out of Scope for MVP)

* User authentication
* Role-based access
* PDF receipts
* CSV export
* Monthly reports
* Multi-tenant SaaS support
* PostgreSQL migration
* Audit logs

---

## 13. Success Criteria (MVP)

* User can install & run app locally
* Credit & Debit entries save correctly
* Ledger displays accurate data
* No duplicate or inconsistent transactions
* Clean UI using shadcn

---

## 14. Risks & Mitigations

| Risk               | Mitigation               |
| ------------------ | ------------------------ |
| Schema rigidity    | Normalized tables        |
| Feature creep      | Strict MVP scope         |
| Data inconsistency | Transaction-based design |

---

## 15. Next Execution Plan (Post-PRD)

**Phase 1**

* Project scaffolding
* Database schema
* FastAPI base

**Phase 2**

* Credit & Debit APIs
* Validation

**Phase 3**

* Frontend forms
* API integration

**Phase 4**

* Ledger UI
* Polish & testing

---

## ✅ Final Note

This PRD is  **production-grade** , not tutorial-grade.

It gives you:

* Clear scope
* Strong foundation
* SaaS-ready architecture
