Below is a **clear, AI-prompt-ready UI wireframe document** for your app.

This is  **visual + structured** , so another AI (or a designer/dev) can directly understand and generate UI screens from it.

I’ll keep it  **simple, clean, and non-technical-user friendly** , exactly as you want.

---

# 🧩 UI WIREFRAME DOCUMENT

**Local Personal Ledger Web App**

---

## 🎨 UI Design Principles

* Minimal screens
* Large readable fields
* Clear labels (no accounting jargon)
* One primary action per screen
* Desktop-first (browser-based)
* No clutter, no sidebars

---

## 🧭 Overall Navigation Flow

```plaintext
[ Credit Entry ] → [ Debit Entry ] → [ Balance & History ]
```

Navigation via **top tabs** or  **Next button** .

---

## 🖥️ Screen 1 — CREDIT ENTRY SCREEN (First Screen)

### Purpose

To record  **incoming money (Credit)** .

---

### 🧱 Layout Structure

```plaintext
--------------------------------------------------
| Ledger App                                    |
--------------------------------------------------
| [ Credit Entry ]  [ Debit Entry ]  [ Balance ] |
--------------------------------------------------

CREDIT ENTRY

Name:
[________________________]

Amount:
[________________________]

Towards:
[ Sasthapreethi  ▼ ]   (Dropdown – fixed)

Payment Mode:
( ) Cash     ( ) Cheque

Receipt No:
[________________________]

[  Submit Credit  ]
--------------------------------------------------
✔ Credit entry saved successfully
--------------------------------------------------
```

---

### 📌 Field Behavior

| Field        | Type     | Notes               |
| ------------ | -------- | ------------------- |
| Name         | Text     | Manual entry        |
| Amount       | Number   | Numeric only        |
| Towards      | Dropdown | Fixed value only    |
| Payment Mode | Radio    | Cash / Cheque       |
| Receipt No   | Text     | Manual entry        |
| Submit       | Button   | Saves & clears form |

---

## 🖥️ Screen 2 — DEBIT ENTRY SCREEN (Second Screen)

### Purpose

To record  **outgoing money (Debit)** .

---

### 🧱 Layout Structure

```plaintext
--------------------------------------------------
| Ledger App                                    |
--------------------------------------------------
| [ Credit Entry ]  [ Debit Entry ]  [ Balance ] |
--------------------------------------------------

DEBIT ENTRY

Purpose:
[________________________]

Amount:
[________________________]

Payment Mode:
( ) Cash     ( ) Cheque

Voucher No:
[________________________]

[  Submit Debit  ]
--------------------------------------------------
✔ Debit entry saved successfully
--------------------------------------------------
```

---

### 📌 Field Behavior

| Field        | Type   | Notes               |
| ------------ | ------ | ------------------- |
| Purpose      | Text   | Manual entry        |
| Amount       | Number | Numeric only        |
| Payment Mode | Radio  | Cash / Cheque       |
| Voucher No   | Text   | Manual entry        |
| Submit       | Button | Saves & clears form |

---

## 🖥️ Screen 3 — BALANCE & HISTORY SCREEN

### Purpose

To  **view balance and full transaction history** .

---

### 🧱 Layout Structure

```plaintext
--------------------------------------------------
| Ledger App                                    |
--------------------------------------------------
| [ Credit Entry ]  [ Debit Entry ]  [ Balance ] |
--------------------------------------------------

BALANCE SUMMARY

Total Credit : ₹ XXXXX
Total Debit  : ₹ XXXXX
--------------------------------
Balance      : ₹ XXXXX
--------------------------------

TRANSACTION HISTORY

--------------------------------------------------
| Date | Type | Name/Purpose | Amount | Mode | Ref |
--------------------------------------------------
| ...  | CR   | ...          | ...    | Cash | ... |
| ...  | DR   | ...          | ...    | Chq  | ... |
--------------------------------------------------
```

---

### 📌 Behavior Rules

* Balance updates **automatically**
* History sorted by **latest first**
* Read-only (no edit/delete)
* Clean table with scroll

---

## 🧠 UX Notes (Very Important)

* ✅ Success message after each submit
* ❌ No popups
* ❌ No edit/delete buttons
* ❌ No login screen
* ✅ Simple language

---

## 🧩 Color & Styling Guidance (Optional)

* Background: White / light gray
* Buttons: Soft blue or green
* Success message: Green
* Balance positive: Green
* Balance zero/negative: Neutral red

---

## 🧪 Non-Tech User Experience

1. Double-click **Start App**
2. Browser opens automatically
3. Credit screen opens first
4. User enters data
5. Moves to Debit screen
6. Views balance anytime
7. Closes browser when done

---

## 🧾 Wireframe Summary (For AI Prompt)

> A 3-screen local ledger web app with:
>
> * Credit entry form
> * Debit entry form
> * Balance & transaction history screen
>
>   Clean UI, fixed fields, no authentication, offline usage, SQLite backend.

---

### ✅ END OF UI WIREFRAME DOCUMENT
