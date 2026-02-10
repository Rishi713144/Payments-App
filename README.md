# PaySafe

A full-stack, monorepo-based payment application built with **Next.js**, **Turborepo**, **Prisma**, and **pnpm** workspaces.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [Pull Request Guidelines](#pull-request-guidelines)
- [License](#license)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rishi713144/PaySafe.git
cd PaySafe
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up PostgreSQL

Run PostgreSQL locally using Docker, or use a managed service like [Neon](https://neon.tech):

```bash
docker run -e POSTGRES_PASSWORD=admin -d -p 5432:5432 postgres
```

### 4. Configure Environment Variables

Copy all `.env.example` files to `.env` and update each with your database connection URL.

### 5. Run Database Migrations and Seed

```bash
cd packages/db
npx prisma migrate dev
npx prisma db seed
```

### 6. Start the Development Server

```bash
cd ../..
pnpm dev
```

### 7. Login

Navigate to the user app and log in with the seeded credentials:

- **Phone:** `1111111111`
- **Password:** `alice`

> See [`packages/db/prisma/seed.ts`](packages/db/prisma/seed.ts) for all seeded data.

---

## Project Structure

```
PaySafe/
├── apps/
│   ├── user-app/          # End-user facing Next.js application
│   ├── merchant-app/      # Merchant-facing Next.js application
│   └── bank-webhook/      # Bank webhook handler service
├── packages/
│   ├── db/                # Prisma schema, migrations, and seed data
│   ├── ui/                # Shared UI component library
│   ├── store/             # Shared state management
│   ├── eslint-config/     # Shared ESLint configurations
│   └── typescript-config/ # Shared TypeScript configurations
├── docker/                # Dockerfiles for each app
└── docker-compose.yml     # Docker Compose for local development
```

---

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | Next.js                           |
| Language     | TypeScript                        |
| Monorepo     | Turborepo + pnpm workspaces       |
| Database     | PostgreSQL                        |
| ORM          | Prisma                            |
| Styling      | Tailwind CSS                      |
| Auth         | NextAuth.js                       |
| Containerization | Docker + Docker Compose       |

---

## Contributing

Contributions are welcome. Please read the **[Contributing Guide](CONTRIBUTING.md)** before getting started. It covers:

- Forking and cloning the repository
- Branch naming conventions
- Commit message format
- Code style and linting expectations
- What files should never be committed
- CI requirements for merging

---

## Pull Request Guidelines

When you open a Pull Request, a **[template](.github/pull_request_template.md)** will load automatically. Please fill it out completely — including the description, testing steps, and all checklists.

PRs that are incomplete, untested, or fail CI will not be reviewed.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
