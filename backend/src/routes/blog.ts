import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*",async (c,next) => {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET);

    if(user) {
        c.set("userId", user.id as string);
        next();
    }
    else{
        c.status(403);
        return c.json({
            message: "Not Authorized!"
        })
    }
})

blogRouter.post("/",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const authId = c.get("userId");
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authId
        }
    })

    return c.json({
        blogId: blog.id
    })
})

blogRouter.put("/",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get("userId");
    const blog = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: blog.id
    })
})  

blogRouter.get("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: body.id
            }
        })
        return c.json({
            blog
        })
    }
    catch(e) {
        c.status(411);
        return c.json({
            message: "Error while fetching the post!"
        })
    }
})


