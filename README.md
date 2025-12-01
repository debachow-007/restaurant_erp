| Module                          | What it handles                                                  | Users / Roles involved       |
| ------------------------------- | ---------------------------------------------------------------- | ---------------------------- |
| Admin / Settings                | Users, roles, permissions, branches, menu config, taxes          | Admin                        |
| HR / Staff                      | Employees, shifts, attendance, payroll later                     | HR                           |
| Purchase                        | Suppliers, purchase orders, GRN / receiving stock                | Purchase manager, accountant |
| Store / Inventory               | Stock levels, stock transfer, wastage, adjustments               | Storekeeper                  |
| Kitchen                         | KOT queue, food preparation & ready items status, consumption    | Chefs / Kitchen users        |
| Restaurant Floor / Tables       | Table management, reservations, waiter assignment                | Manager, Waiters             |
| Orders / POS                    | Taking orders (dine-in / takeaway / delivery), modifiers, status | Waiters, POS cashier         |
| Billing / Payments              | Bill generation, split payments, discounts, taxes                | Cashier / Manager            |
| Sales & Reports / Dashboard     | Daily sales, item report, tax report, consumption, food cost     | Admin & Manager              |


Phase 1 — Core Setup

    Auth (login, register, role-based access)
    Users & permissions
    Branch management

Phase 2 — Menu

    Menu categories & items
    Recipes (optional initially)

Phase 3 — Restaurant floor

    Tables management

Phase 4 — Orders (POS)

    Create order
    Add/update/delete order items
    Move status through lifecycle
    KOT kitchen screen

Phase 5 — Billing

    Payment methods
    Print/calc bill & finalize order

Phase 6 — Purchase & Inventory

    Suppliers
    Purchase orders
    Stock management
    Auto consumption & wastage

Phase 7 — HR & Reports

    Employees
    Attendance
    Sales, order, food cost reports