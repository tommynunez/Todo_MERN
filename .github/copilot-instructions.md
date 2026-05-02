# ChoreМate Engineering Guidelines for AI-Assisted Development

## Context

A MERN-stack todo/chore management application. Users can create chore lists, add todos to them, and invite others (family, friends, teams) to collaborate with role-based access.

**Tech stack:**

- **Server:** Node.js, Express 5, TypeScript, Mongoose/MongoDB, Passport.js (local strategy), express-session, JWT, Helmet
- **Client:** React 19, TypeScript, Vite, Tailwind CSS, TanStack Query v5, Axios, React Router v7
- **Testing:** Jest + ts-jest (server only)
- **Tooling:** ESLint (Airbnb config), Prettier, tsx (dev server)

---

## Server Architecture

The server follows a strict **Routes → Services → Repositories → Models** layered architecture. Never skip a layer.

### Layers

- **Routes** (`src/server/routes/`) — Express routers. Handle HTTP, validate input with `express-validator`, call one service, return a response. No business logic.
- **Services** (`src/server/services/`) — Business logic only. Depend on repositories via constructor injection. Implement a corresponding `I*Service` interface.
- **Repositories** (`src/server/repositories/`) — All Mongoose queries live here. No business logic. Accept and return typed interfaces.
- **Models** (`src/server/models/`) — Mongoose schemas. Each model implements its `I*` interface from `src/server/interfaces/`.

### Naming conventions

- Routes: `create*Routes(service)` factory function, file `*Route.ts`
- Services: `*Service` class implementing `I*Service`, file `*Service.ts`
- Repositories: `*Repository` class, file `*Repository.ts`
- Models: `*Model` export, file `*Model.ts` (note: use camelCase not PascalCase for file names)
- Interfaces: `I*` prefix, grouped per domain in `src/server/interfaces/`

### Dependency injection

Services receive all dependencies via constructor. Wiring happens in `src/server/index.ts`. No global singletons except the Mongoose connection.

```typescript
// Example wiring in index.ts
app.use(
  '/api/todos',
  authenticatedMiddleware,
  createTodoroutes(
    new TodoService(
      new TodoRepository(),
      new ChoreListService(new ChoreRepository()),
      new UserService(new UserRepository()),
      new AuditlogService(new AuditLogRepository()),
    ),
  ),
);
```

### Constants

Use `as const` objects with derived union types. Located in `src/server/constants/`.

```typescript
export const Roles = {
  Viewer: 'viewer',
  Editor: 'editor',
  Owner: 'owner',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
```

### Audit logging

Use `AuditlogService` with events from `src/server/constants/AuditEvents.ts`. Always provide an `event` from `AuditEvents` — never use freeform strings for `eventId`/`category`.

```typescript
this.auditLogService.log({
  message: `Todo created by user ${userId}`,
  severity: SeverityLevel.INFORMATIONAL,
  saveToDb: true,
  event: AuditEvents.Todo.CREATED,
});
```

Event ID ranges:

- Authentication: 1000s
- Todo: 2000s
- ChoreList: 3000s
- Invite: 4000s

### Error handling

Services catch errors internally and return `false` or `null` — they do not throw. Routes check the return value and respond with the appropriate HTTP status.

### Mongoose

- Always use `_id` (not `id`) for MongoDB document identifiers
- `ref` names must match the model registration name exactly (e.g. `'UserAccount'`, `'ChoreList'`)
- Add `{ timestamps: true }` to all schemas
- Subdocument value objects should NOT extend `mongoose.Document`

---

## Client Architecture

### Data fetching

All server communication goes through **service classes** in `src/client/services/`. Services use a dedicated `axios` instance with `withCredentials: true`. Never call `axios` directly from components or hooks.

```typescript
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api/todos`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
```

**TanStack Query** handles caching and mutations via custom hooks in `src/client/hooks/`. Each hook wraps a service class instance and exposes `useQuery`/`useMutation` results.

```typescript
const todoService = new TodoService();

export const useTodos = (params?: UseTodosParams) => {
  const queryClient = useQueryClient();
  const queryKey = ['todos', params];
  // ...
};
```

### State management

- **TanStack Query** — server state (todos, chore lists, invites)
- **React Context** — global UI state only (dark mode in `ApplicationContext`, auth state in `AuthorizationContext`, snackbar in `SnackbarContext`)
- **Local `useState`** — form and ephemeral component state
- Do not use Redux or Zustand

### Component structure

- **Shared/UI primitives** (`src/client/shared/`) — `Input`, `Button`, `Snackbar`, `AppBar`, `Footer`, `Typography` (H1–H4, P). Always use these instead of raw HTML equivalents.
- **Feature components** (`src/client/components/`) — grouped by domain (`home/`, `authentication/`, `layout/`)
- **Pages** (`src/client/pages/`) — one folder per route, thin wrappers that compose feature components

Export shared components via the barrel `src/client/shared/index.tsx`.

### Path aliases

Use these aliases — never use relative `../` paths that cross layer boundaries:

```
@/* → src/*
@components/* → src/client/components/*
@services/* → src/client/services/*
@pages/* → src/client/pages/*
@hooks/* → src/client/hooks/*
@context → src/client/context
@shared → src/client/shared
@assets/* → src/assets/*
```

### Styling

- **Tailwind CSS** exclusively — no inline styles, no CSS Modules, no Styled Components
- Responsive prefix order: mobile-first (`sm:`, `md:`, `lg:`)
- Colour variants are defined per feature (e.g. `featureStyles` object keyed by feature id)
- Dark mode via the `isDark` flag from `ApplicationContext` + Tailwind `dark:` classes

### Validation

Use helpers from `src/client/helpers/validator.ts` (`validateEmail`, `validateText`, etc.) for client-side form validation. Do not duplicate regex inline.

---

## TypeScript conventions

- All function parameters and return types must be explicitly typed — no `any` unless wrapping a third-party boundary
- Interfaces use `I*` prefix for domain objects (`ITodo`, `IUserAccount`)
- DTOs for add/update/delete operations use the `I*Add`, `I*Update`, `I*Delete` naming pattern
- Service interfaces (`I*Service`) live alongside domain interfaces in `src/server/interfaces/`
- Client-side types that mirror server types (e.g. `ITodo` in `todo.tsx`) should eventually be consolidated into a shared package
- Do not use nested ternaries — use an `if/else` block or an IIFE instead:

```tsx
// Bad
error={isA ? 'Message A' : isB ? 'Message B' : ''}

// Good
error={(() => {
  if (isA) return 'Message A';
  if (isB) return 'Message B';
  return '';
})()}
```

---

## Testing

- Tests live alongside the service file as `*.test.ts` (e.g. `todoService.test.ts`)
- Use Jest + ts-jest
- Test only service and utility logic — routes and repositories are integration concerns
- Run tests with `npm test`
