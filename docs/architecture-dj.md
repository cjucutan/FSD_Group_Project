# Architecture — Search + Marketplace (Sprint 3)
*Author: Dj*

## `useMarketplace` Hook

### 1) What does this hook do?
- Manages **all marketplace UI state** in one place:
  - Search text (`q`)
  - Filters (`platform`, `condition`, `maxPrice`, `savedOnly`)
  - Sorting (`recent`, `priceAsc`, `priceDesc`)
  - Loading state
  - The current list of items to show
- Exposes actions the UI needs:
  - `setFilters(...)`
  - `toggleSaved(id)`
  - `addItem(payload)`
  - `removeItem(id)`

### 2) Why this logic here (separation of concerns)?
- The hook is **presentation logic** only. It coordinates user input and screen state.
- It **does not** implement business rules or storage. Instead it **calls the service** for that:
  - When filters change, it asks the **service** for the filtered/sorted list.
  - When adding/removing/saving, it calls **service** methods that know the rules.
- This keeps UI code clean and easy to reuse across components.

### 3) Where is it used and how?
- **`CartridgeCartPage.tsx`** calls `useMarketplace()` to:
  - Bind inputs to `filters` (search box, selects, etc.)
  - Render `items` returned by the hook
  - Call `toggleSaved`, `addItem`, and `removeItem` from buttons/forms
- It can also be reused in a small **`SearchBar`** component if we want to share the search controls elsewhere.

---

## `marketplaceService.ts`

### 1) What does this service do?
- Holds **business rules** for the marketplace:
  - Filter by search text, platform, condition, max price, and saved-only.
  - Sort items by “recent”, price low→high, price high→low.
  - Create/update/remove items in a consistent way.
- It does **not** touch UI or the DOM.

### 2) Why this logic here (separation of concerns)?
- Services are for **business logic only**:
  - They receive plain data (filters, items) and return plain data (results).
  - They call the **repository** to read/write data, so the hook doesn’t care where data lives.
- This makes it easy to change rules in one place, and keeps the hook thin.

### 3) Where is it used and how?
- **Used by `useMarketplace`**:
  - `service.query(filters)` → returns filtered/sorted items.
  - `service.addItem(payload)` → validates/normalizes, then saves via repo, then returns the new list.
  - `service.toggleSaved(id)` and `service.removeItem(id)` → update via repo and return the fresh list.

---

## `marketplaceRepo.ts`

### 1) What does this repository do?
- Owns **data access** for marketplace items.
- Provides simple CRUD over our **test data + localStorage**:
  - `getAll()`
  - `create(item)`
  - `update(id, updates)`
  - `remove(id)`

### 2) Why this logic here (separation of concerns)?
- Repositories are for **storage only**:
  - They know where data comes from (right now: test data and localStorage).
  - They don’t do validation or filtering — that’s the service’s job.
- Later we can swap localStorage for an API or database **without touching** the service or hook.

### 3) Where is it used and how?
- **Used by `marketplaceService`** for all reads/writes.
- The hook never calls the repo directly; it always goes through the service.

