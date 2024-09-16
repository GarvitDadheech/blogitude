import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInBody,SignUpBody, signInBody, signUpBody } from '@garvit_dadheech/blogitude';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
  try {
        const body = await c.req.json();
        const {success} = signUpBody.safeParse(body);
        if(!success) {
          c.status(411);
          return c.json({
            message: "Incorrect Inputs!"
          })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name
            },
        });

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            jwt: token
        });
    } catch (e) {
        c.status(500);
        return c.json({ error: 'Error during signup' });
    }
});

userRouter.post('/signin', async (c) => {
  try {
      
        const body = await c.req.json();
        const {success} = signInBody.safeParse(body);
        if(!success) {
          c.status(411);
          return c.json({
            message: "Incorrect Inputs!"
          })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const user = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        });

        if (!user) {
            c.status(403);
            return c.json({
                error: 'User Not Found!'
            });
        }

        const isPasswordValid = await bcrypt.compare(body.password, user.password);

        if (!isPasswordValid) {
            c.status(403);
            return c.json({
                error: 'Invalid password!',
            });
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        return c.json({
            jwt: token,
            name: user.name
        });
    } catch (e) {
        c.status(500);
        return c.json({ error: 'Error during signin' });
    }
});
