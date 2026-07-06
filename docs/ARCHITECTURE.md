# Clean Architecture — Mali Beakery (Next.js)

This project follows the **Clean Architecture + Feature-Sliced Design** convention
from the team's architecture PDFs, implemented natively for **Next.js 15 (App
Router)**. This document is the canonical reference for "where does this code go?"

> The marketing **home page** (`src/app/page.tsx` + its `src/features/*` section
> slices) is intentionally left exactly as-is. All the layers below are the
> scaffold your team extends when building the authenticated commerce app. Every
> file referenced here exists in the repo as a working, type-checked example.

---

## The Golden Rule — Separation of Concerns

- **Never** call the API directly inside a component.
- **Never** put business logic (money math, status derivation) inside a component.
- Components care only about **how things look** and **user interaction**.
- Hooks care about **where data comes from** and loading/error states.
- Services care about **how to talk to the network**.
- Domain types care about **what the data is** — no React, no Axios.

Dependencies point **inward**: `presentation → application → infrastructure → domain`.
The `domain/` layer imports nothing.

---

## The canonical chain

```
Page (thin)  →  Feature Component  →  Hook (useQuery)  →  Service  →  apiClient  →  API
```

Worked end-to-end in the **Orders slice** (`src/app/(private)/orders/`).

---

## Layers & folders

| Folder | Role | May import from |
| --- | --- | --- |
| `src/domain/` | Entities & enums (pure TS) | nothing |
| `src/infrastructure/` | Axios client, interceptors, storage | domain |
| `src/features/<name>/` | Service + hooks + components + schemas (shared feature slices) | domain, infrastructure, lib, stores, shared components |
| `src/app/(group)/<route>/` | Route-co-located feature logic + `page.tsx` | same as features |
| `src/stores/` | Zustand global client state (auth, cart, selection) | domain, infrastructure |
| `src/hooks/` | Global reusable hooks (URL/listing/debounce/logout) | stores, features' services |
| `src/providers/` | React Query / Theme / i18n context | — |
| `src/lib/` | `cn`, `errorHandler`, `query-builder` | — |
| `src/components/` | Shared design system (ui, table, feedback, skeleton, card…) | lib, domain |
| `src/dictionaries/` | i18n locales (en/am) + client | — |
| `src/config/` | `fonts.ts`, `theme.ts` | — |
| `src/constant/` | `paths.ts` + static constants | — |
| `src/types/` | Global TS types | — |

### Routing (Next.js App Router)

Route groups mirror the original `(public) / (private) / (auth)` grouping:

- `app/(public)/` — SEO-friendly, unauthenticated (example: `/reviews`).
- `app/(private)/` — auth-gated via `ProtectedRoute` in the group layout
  (examples: `/dashboard`, `/orders`, `/orders/[id]`, `/products`, `/settings`).
- `app/(auth)/` — sign-in / sign-up (example: `/sign-in`).

**Providers are scoped to each group's layout** (`AppProviders`) rather than the
root layout, so the marketing home page render tree stays untouched. In a
greenfield app you would instead mount `AppProviders` once in the root
`app/layout.tsx`.

---

## State management

| Kind | Tool | Lives in |
| --- | --- | --- |
| Server state (orders, products) | **TanStack Query** | feature `hooks/` |
| Global client state (auth, cart) | **Zustand** | `src/stores/` |
| Local UI state | `useState` | the component |

Golden rule: data from the API is **server state** — cache it in React Query,
never copy it into Zustand.

## Authorization (permission-based)

The user carries a list of `Permission` strings (`src/domain/enums/permission.enum.ts`).

- **Route-level**: `ProtectedRoute` (must be authenticated).
- **UI-level**: `<Can require="orders.create">…</Can>` hides actions.

Client checks are UX only — **the API must verify every request**.

## Errors

Always route through the centralized handler:

```ts
import { errorHandler } from "@/lib/utils/errorHandler";
try { /* ... */ } catch (e) { errorHandler.handle(e); }
```

Pair every list with three states: **loading skeleton → error → empty** (see
`OrderTable`, `ProductGrid`).

---

## How to add a new feature (e.g. "Reviews") — the walkthrough

The `reviews` feature is implemented as a live example of these exact steps.

1. **Domain** — define the entity: `src/domain/entities/review.types.ts`.
2. **Infrastructure** — add endpoints in `src/infrastructure/api/endpoints.ts`.
3. **Application** — in `src/features/reviews/`:
   - `api/reviewService.ts` — calls `apiClient`, returns domain types.
   - `lib/reviewKeys.ts` — query-key factory.
   - `hooks/useReviews.ts` — `useQuery`, returns `{ data, isLoading, error }`.
4. **Presentation** — `components/ReviewList.tsx` + `ReviewCard.tsx`, using the hook.
   Export the public surface from `index.ts`.
5. **Register the page** — `app/(public)/reviews/page.tsx` composes `<ReviewList />`.

That is the whole vertical: domain → infrastructure → application → presentation →
route, with no transport logic leaking into components.

---

## Naming conventions

| File type | Location | Convention | Example |
| --- | --- | --- | --- |
| Entities | `domain/entities/` | `name.types.ts` | `order.types.ts` |
| Enums | `domain/enums/` | `name.enum.ts` | `permission.enum.ts` |
| Services | `features/*/api/` | `nameService.ts` | `authService.ts` |
| Data hooks | `features/*/hooks/` | `useName.ts` | `useOrders.ts` |
| Query keys | `features/*/lib/` | `nameKeys.ts` | `orderKeys.ts` |
| Schemas | `features/*/schemas/` | `name.schema.ts` | `login.schema.ts` |
| Components | `*/components/` | `PascalCase.tsx` | `OrderTable.tsx` |
| Pages | `app/**/page.tsx` | route folder | `orders/page.tsx` |
| Stores | `stores/` | `nameStore.ts` | `authStore.ts` |

---

## Environment & scripts

- Copy `.env.example` → `.env.local`; set `NEXT_PUBLIC_API_BASE_URL`.
- `npm run dev` · `npm run build` · `npm run typecheck` · `npm run lint`.

## Dependency reference

Next.js 15 · React 19 · TanStack Query · Zustand · Axios · React Hook Form · Zod ·
Tailwind CSS · Framer Motion · Lucide · Sonner · CVA · tailwind-merge/clsx · i18next.
