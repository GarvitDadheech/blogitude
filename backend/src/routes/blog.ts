import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { postBlogBody,updateBlogBody } from "@garvit_dadheech/blogitude";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    try {
        const authHeader = c.req.header("authorization") || "";
        const user = await verify(authHeader, c.env.JWT_SECRET);

        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "Not Authorized!"
            });
        }
    } catch (e) {
        c.status(401);
        return c.json({
            message: "Error during authorization!"
        });
    }
});

blogRouter.post("/", async (c) => {
    try {
        const body = await c.req.json();
        const {success} = postBlogBody.safeParse(body);
        if(!success) {
            c.status(411);
            return c.json({
                message: "Incorrect Inputs!"
            })
        }
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const authId = c.get("userId");
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authId,
                publishedAt: new Date()
            }
        });

        return c.json({
            blogId: blog.id
        });
    } catch (e) {
        c.status(500);
        return c.json({
            message: "Error while creating blog!"
        });
    }
});

blogRouter.put("/", async (c) => {
    try {
        const body = await c.req.json();
        const { success } = updateBlogBody.safeParse(body);
        if (!success) {
            c.status(411);
            return c.json({
                message: "Incorrect Inputs!"
            });
        }

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const userId = c.get("userId");

        const blog = await prisma.post.findUnique({
            where: {
                id: body.id
            }
        });

        if (!blog) {
            c.status(404);
            return c.json({
                message: "Blog not found"
            });
        }

        if (blog.authorId !== userId) {
            c.status(403);
            return c.json({
                message: "Unauthorized to update this blog"
            });
        }

        const updatedBlog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({
            id: updatedBlog.id
        });
    } 
    catch (e) {
        console.error("Error while updating blog:", e);
        c.status(500);
        return c.json({
            message: "Error while updating blog!"
        });
    }
});


blogRouter.get("/bulk", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const limit = Number(c.req.query("limit")) || 10;
        const offset = Number(c.req.query("offset")) || 0;

        const blogs = await prisma.post.findMany({
            skip: offset,
            take: limit,
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        const totalBlogs = await prisma.post.count();

        return c.json({
            blogs,
            totalBlogs,
            currentPage: offset / limit + 1,
            totalPages: Math.ceil(totalBlogs / limit)
        });
    } catch (e) {
        c.status(500);
        return c.json({
            message: "Error while fetching blogs!"
        });
    }
});

blogRouter.get("/user-blogs",async (c) => {
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const userId = c.get("userId");

        if (!userId) {
            c.status(403);
            return c.json({
                message: "User not authenticated"
            });
        }
        const blogs = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        
        return c.json({
            blogs
        })
    }
    catch(e) {
        c.status(500);
        return c.json({
            message: "Error while fetching your blogs"
        })
    }
})

blogRouter.get("/:id", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blogId = c.req.param("id");
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            },  
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            blog
        });
    } catch (e) {
        c.status(500);
        return c.json({
            message: "Error while fetching the post!"
        });
    }
});

blogRouter.delete("/:id", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blogId = c.req.param("id");
        if (!blogId) {
            c.status(400);
            return c.json({ message: "Blog ID is required" });
        }

        const userId = c.get("userId");

        const blog = await prisma.post.findUnique({
            where: {
                id: blogId
            }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        if (blog.authorId !== userId) {
            c.status(403);
            return c.json({ message: "Unauthorized to delete this blog" });
        }

        await prisma.post.delete({
            where: {
                id: blogId
            }
        });

        return c.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        c.status(500);
        return c.json({ message: "Error while deleting the blog" });
    }
});

