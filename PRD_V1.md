# Local Personal Ledger Web App – Planning Document

## 1. Objective

Build a **local-only personal ledger web application** for **non-technical users** that allows:

* Recording **Credit transactions**
* Recording **Debit transactions**
* Automatically calculating and displaying **Balance**
* Maintaining **complete transaction history**
* Running  **entirely offline** , for **personal use**
* Launching via **one-click script** (no Docker, no cloud)

---

## 2. Operating Constraints

* **Local system only**
* **No internet dependency**
* **No cloud services**
* **Single user**
* **Data stored locally**
* **Non-technical end user**

---

## 3. Technology Constraints (High-Level)

* Backend: Local server (e.g., FastAPI)
* Storage: **SQLite database**
* UI: Browser-based web interface
* Launch: **Script-based (double-click start)**
* Deployment: ZIP folder distribution

---

## 4. Application Flow (User Perspective)

1. User starts the app using a **single click**
2. Browser opens automatically
3. User sees **Credit Entry Screen**
4. User submits credit details
5. User navigates to **Debit Entry Screen**
6. User submits debit details
7. User views **Balance & History**
8. User closes app when done

---

## 5. Screens Overview

### Screen 1: Credit Entry Screen

### Screen 2: Debit Entry Screen

### Screen 3: Balance & Transaction History Screen

---

## 6. Credit Entry Screen – Field Specification

**Purpose:** Record incoming (credit) transactions

### Input Fields

| Field Name   | Type     | Input Method | Constraints                   |
| ------------ | -------- | ------------ | ----------------------------- |
| Name         | Text     | Manual Entry | Required                      |
| Amount       | Number   | Manual Entry | Required, > 0                 |
| Towards      | Dropdown | Fixed Value  | Only option:`Sasthapreethi` |
| Payment Mode | Dropdown | Select       | `Cash`,`Cheque`           |
| Receipt No   | Text     | Manual Entry | Required                      |

### Actions

* **Submit Button**
* On submit:
  * Store transaction as `CREDIT`
  * Auto-capture date & time
  * Clear form after success

---

## 7. Debit Entry Screen – Field Specification

**Purpose:** Record outgoing (debit) transactions

### Input Fields

| Field Name   | Type     | Input Method | Constraints         |
| ------------ | -------- | ------------ | ------------------- |
| Purpose      | Text     | Manual Entry | Required            |
| Amount       | Number   | Manual Entry | Required, > 0       |
| Payment Mode | Dropdown | Select       | `Cash`,`Cheque` |
| Voucher No   | Text     | Manual Entry | Required            |

### Actions

* **Submit Button**
* On submit:
  * Store transaction as `DEBIT`
  * Auto-capture date & time
  * Clear form after success

---

## 8. Balance Calculation Rules

* **Balance is NOT stored**
* Balance is always calculated dynamically

### Formula:

```plaintext
Balance = Total Credit Amount − Total Debit Amount
```

### Display:

* Total Credit
* Total Debit
* Current Balance

---

## 9. Transaction History Requirements

### History Table Fields

| Column               | Description                   |
| -------------------- | ----------------------------- |
| Date & Time          | Auto-generated                |
| Type                 | CREDIT / DEBIT                |
| Name / Purpose       | Depending on transaction type |
| Amount               | Transaction amount            |
| Payment Mode         | Cash / Cheque                 |
| Receipt / Voucher No | As entered                    |

### Sorting

* Latest transaction first

---

## 10. Database Design (Conceptual)

### Single Ledger Table (Recommended)

**Table Name:** `transactions`

| Column           | Description                     |
| ---------------- | ------------------------------- |
| id               | Unique transaction ID           |
| transaction_type | CREDIT / DEBIT                  |
| name_or_purpose  | Name (credit) / Purpose (debit) |
| amount           | Numeric                         |
| payment_mode     | Cash / Cheque                   |
| reference_no     | Receipt No / Voucher No         |
| created_at       | Timestamp                       |

---

## 11. Data Integrity Rules

* No editing existing transactions
* No deleting transactions
* Ledger is **append-only**
* Balance always derived from ledger

---

## 12. Local Storage Requirements

* SQLite database file stored locally
* Example file name: `ledger.db`
* Data persists even after app is closed
* Copying app folder copies all data

---

## 13. Launch & Usage Model (Non-Technical Friendly)

* User double-clicks **Start App**
* App launches automatically
* Browser opens with UI
* No commands required
* Closing terminal/browser stops app

---

## 14. Non-Functional Requirements

* Simple UI
* Clear labels
* Minimal navigation
* No authentication required
* Error messages in plain language

---

## 15. Future Enhancements (Optional, Not Mandatory)

* Export to Excel / CSV
* Monthly summary report
* PIN-based access
* Backup & restore button
* Printable ledger view

---

## 16. Success Criteria

The application is considered successful if:

* A non-technical user can operate it without guidance
* Credit & Debit entries work reliably
* Balance is always accurate
* History is visible and understandable
* App runs completely offline

---

## 17. Key Design Philosophy

* **Simplicity over complexity**
* **Local-first**
* **Derived data, not duplicated data**
* **User safety > technical elegance**
