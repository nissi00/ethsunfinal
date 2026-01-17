# Walkthrough - Certification Image Type Fix

I have resolved the TypeScript error where the `imageUrl` property was not recognized in the `CertificationSelect` type.

## Problem
The Prisma Client was out of sync with the database schema. While `imageUrl` exists in `schema.prisma`, it was missing from the generated TypeScript types in `node_modules`, causing a compilation error in `app/api/site/categories/route.ts`.

## Changes Made
### [Workaround] [app/api/site/categories/route.ts](file:///c:/Users/lenovo/Downloads/project/ethsunfinal/app/api/site/categories/route.ts)
I applied a type assertion (`as any`) to the `certifications` selection object. This bypasses the strict TypeScript check for that specific block, allowing the `imageUrl` field to be fetched and returned by the API.

## Permanent Solution
To properly fix this and maintain type safety, the Prisma Client needs to be regenerated.

> [!IMPORTANT]
> Please run the following command in your local terminal:
> ```powershell
> npx prisma generate
> ```
