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
        await next();
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

blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogId = c.req.param("id");
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
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

blogRouter.get("/bulk",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const limit = Number(c.req.query("limit")) || 10;
    const offset = Number(c.req.query("offset")) || 0;
    
    try{
        const blogs = await prisma.post.findMany({
            skip: offset,
            take: limit
        })
        const totalBlogs = await prisma.post.count();
        return c.json({
            blogs,
            totalBlogs,
            currentPage: offset/limit + 1,
            totalPages: Math.ceil(totalBlogs/limit)
        })
    }
    catch(e) {
        c.status(500)
        return c.json({
            message: "Error while fetching blogs!"
        })
    }
})
