import { PrismaClient } from '@prisma/client/extension';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';

// Create the main Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>



export default app;
