# Clean Architecture - Code Review Guide

## Architecture Layers

Clean Architecture organizes code into concentric layers, with dependencies pointing inward toward the domain core.

```
┌─────────────────────────────────────┐
│     Infrastructure Layer           │  ← External dependencies
│  (API clients, DB, External APIs)  │
├─────────────────────────────────────┤
│     Interface Adapters Layer       │  ← Controllers, Presenters, Gateways
│  (React components, API routes)    │
├─────────────────────────────────────┤
│     Application Layer              │  ← Use Cases, Application Services
│  (Business logic orchestration)    │
├─────────────────────────────────────┤
│     Domain Layer                   │  ← Entities, Value Objects
│  (Business rules, core logic)      │  ← No external dependencies
└─────────────────────────────────────┘
```

## Layer Responsibilities

### Domain Layer (Core)

**What belongs here:**

- Business entities
- Value objects
- Domain events
- Domain exceptions
- Business rules and invariants

**Rules:**

- ✅ Zero dependencies on external frameworks
- ✅ Pure TypeScript/JavaScript
- ✅ Framework-agnostic
- ❌ No imports from other layers
- ❌ No infrastructure concerns

```typescript
// ✅ Domain Entity
export class User {
  private constructor(
    public readonly id: UserId,
    public readonly email: Email,
    private name: UserName,
    private passwordHash: string,
    public readonly createdAt: Date,
  ) {}

  static create(props: {
    email: string;
    name: string;
    password: string;
  }): Result<User, ValidationError> {
    // Validation
    const emailResult = Email.create(props.email);
    if (!emailResult.success) return emailResult;

    const nameResult = UserName.create(props.name);
    if (!nameResult.success) return nameResult;

    // Business rules
    const passwordHash = hashPassword(props.password);
    const id = UserId.generate();

    return {
      success: true,
      data: new User(
        id,
        emailResult.data,
        nameResult.data,
        passwordHash,
        new Date(),
      ),
    };
  }

  changeName(newName: string): Result<void, ValidationError> {
    const nameResult = UserName.create(newName);
    if (!nameResult.success) return nameResult;

    this.name = nameResult.data;
    return { success: true, data: undefined };
  }

  verifyPassword(plainPassword: string): boolean {
    return verifyHash(plainPassword, this.passwordHash);
  }
}

// ✅ Value Object
export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Result<Email, ValidationError> {
    if (!this.isValid(email)) {
      return {
        success: false,
        error: new ValidationError('Invalid email format', 'email'),
      };
    }
    return { success: true, data: new Email(email.toLowerCase()) };
  }

  private static isValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
```

### Application Layer (Use Cases)

**What belongs here:**

- Use cases / Application services
- Input/Output DTOs
- Repository interfaces
- Service interfaces

**Rules:**

- ✅ Orchestrates domain objects
- ✅ Defines interfaces (ports)
- ✅ Contains business workflows
- ❌ No framework-specific code
- ❌ No direct infrastructure access

```typescript
// ✅ Repository Interface (Port)
export interface UserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}

// ✅ Use Case
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    request: RegisterUserRequest,
  ): Promise<Result<RegisterUserResponse, ApplicationError>> {
    // 1. Create domain entity
    const userResult = User.create({
      email: request.email,
      name: request.name,
      password: request.password,
    });

    if (!userResult.success) {
      return {
        success: false,
        error: new ApplicationError(userResult.error.message),
      };
    }

    const user = userResult.data;

    // 2. Check if user already exists
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      return {
        success: false,
        error: new ApplicationError('User already exists'),
      };
    }

    // 3. Save user
    await this.userRepository.save(user);

    // 4. Send welcome email
    await this.emailService.sendWelcomeEmail(user.email.toString());

    // 5. Publish domain event
    await this.eventBus.publish(new UserRegisteredEvent(user.id, user.email));

    return {
      success: true,
      data: {
        userId: user.id.toString(),
        email: user.email.toString(),
      },
    };
  }
}

// ✅ DTOs
export interface RegisterUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterUserResponse {
  userId: string;
  email: string;
}
```

### Interface Adapters Layer (Controllers/Presenters)

**What belongs here:**

- API controllers
- React components
- Presenters/ViewModels
- Gateways (adapter implementations)
- Data mappers

**Rules:**

- ✅ Converts between use case format and external format
- ✅ Implements repository interfaces
- ✅ Framework-specific code allowed here
- ❌ No business logic
- ❌ No direct domain manipulation

```typescript
// ✅ API Controller (Express example)
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.registerUserUseCase.execute({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });

      if (!result.success) {
        res.status(400).json({
          error: result.error.message,
        });
        return;
      }

      res.status(201).json({
        data: result.data,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}

// ✅ React Component (Presenter)
interface RegisterFormProps {
  onRegister: (data: RegisterUserRequest) => Promise<void>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onRegister(formData);
      // Handle success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {/* Other fields */}
      <button type="submit">Register</button>
    </form>
  );
};
```

### Infrastructure Layer (External Concerns)

**What belongs here:**

- Database implementations
- External API clients
- File system access
- Third-party services
- Framework configuration

**Rules:**

- ✅ Implements interfaces from application layer
- ✅ All external dependencies here
- ✅ Database queries and ORM code
- ❌ No business logic
- ❌ No direct domain access (go through use cases)

```typescript
// ✅ Repository Implementation
import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: UserId): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    });

    if (!userData) return null;

    return this.toDomain(userData);
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.toString() },
    });

    if (!userData) return null;

    return this.toDomain(userData);
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id.toString() },
      update: this.toPersistence(user),
      create: this.toPersistence(user),
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: id.toString() },
    });
  }

  // Mapper methods
  private toDomain(raw: any): User {
    // Convert database model to domain entity
    // This is where you handle the impedance mismatch
  }

  private toPersistence(user: User): any {
    // Convert domain entity to database model
  }
}
```

## Dependency Injection

```typescript
// ✅ Dependency Container
export class DependencyContainer {
  private static instance: DependencyContainer;
  private repositories: Map<string, any> = new Map();
  private useCases: Map<string, any> = new Map();

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  // Infrastructure
  registerRepository<T>(key: string, repository: T): void {
    this.repositories.set(key, repository);
  }

  getRepository<T>(key: string): T {
    const repo = this.repositories.get(key);
    if (!repo) throw new Error(`Repository ${key} not found`);
    return repo as T;
  }

  // Use Cases
  registerUseCase<T>(key: string, useCase: T): void {
    this.useCases.set(key, useCase);
  }

  getUseCase<T>(key: string): T {
    const useCase = this.useCases.get(key);
    if (!useCase) throw new Error(`Use case ${key} not found`);
    return useCase as T;
  }
}

// ✅ Bootstrap / Setup
export function setupDependencies(): DependencyContainer {
  const container = DependencyContainer.getInstance();

  // Infrastructure
  const prisma = new PrismaClient();
  const userRepository = new PrismaUserRepository(prisma);
  const emailService = new SendGridEmailService();
  const eventBus = new InMemoryEventBus();

  container.registerRepository('UserRepository', userRepository);

  // Use Cases
  const registerUserUseCase = new RegisterUserUseCase(
    userRepository,
    emailService,
    eventBus,
  );

  container.registerUseCase('RegisterUserUseCase', registerUserUseCase);

  return container;
}
```

## Folder Structure

```
src/
├── domain/                    # Domain Layer
│   ├── entities/
│   │   ├── User.ts
│   │   └── Post.ts
│   ├── value-objects/
│   │   ├── Email.ts
│   │   ├── UserId.ts
│   │   └── UserName.ts
│   ├── events/
│   │   └── UserRegisteredEvent.ts
│   └── errors/
│       └── DomainError.ts
│
├── application/               # Application Layer
│   ├── use-cases/
│   │   ├── RegisterUserUseCase.ts
│   │   ├── GetUserUseCase.ts
│   │   └── UpdateUserUseCase.ts
│   ├── interfaces/           # Ports
│   │   ├── UserRepository.ts
│   │   ├── EmailService.ts
│   │   └── EventBus.ts
│   └── dtos/
│       ├── RegisterUserRequest.ts
│       └── RegisterUserResponse.ts
│
├── infrastructure/           # Infrastructure Layer
│   ├── persistence/
│   │   ├── prisma/
│   │   │   └── PrismaUserRepository.ts
│   │   └── in-memory/
│   │       └── InMemoryUserRepository.ts
│   ├── services/
│   │   ├── SendGridEmailService.ts
│   │   └── InMemoryEventBus.ts
│   └── config/
│       └── database.ts
│
└── presentation/             # Interface Adapters
    ├── api/                 # REST API
    │   ├── controllers/
    │   │   └── UserController.ts
    │   ├── middleware/
    │   └── routes/
    └── web/                 # React App
        ├── components/
        ├── pages/
        ├── hooks/
        └── providers/
```

## Review Checklist - Clean Architecture

- [ ] Domain layer has no external dependencies
- [ ] Business logic is in domain or application layer, not in controllers/components
- [ ] Dependencies point inward (infrastructure → interface adapters → application → domain)
- [ ] Repository interfaces defined in application layer
- [ ] Repository implementations in infrastructure layer
- [ ] Use cases orchestrate domain entities, don't contain business logic
- [ ] DTOs used for crossing boundaries
- [ ] Dependency injection used for flexibility
- [ ] Domain entities are framework-agnostic
- [ ] Value objects used for domain concepts
- [ ] Proper separation of concerns
- [ ] No circular dependencies between layers
