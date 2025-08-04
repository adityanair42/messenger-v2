import express from "express"
import jwt from "jsonwebtoken"
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/zod-auth/types"
import { prismaClient } from "@repo/db/client"
import cors from "cors"
import { JWT_SECRET } from '@repo/common/config'
import { middleware } from './middleware' 

const app = express()
app.use(cors());
app.use(express.json())

app.post("/signup", async (req, res) => {

    const parsedData = CreateUserSchema.safeParse(req.body)
    if (!parsedData.success) {
        console.log(parsedData.error)
        res.json({
            message: "Incorrect inputs"
        })
        return
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                // TODO: Hash the pw
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists with this email"
        })
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return
    }

    // TODO: Compare the hashed pws here
    const user = await prismaClient.user.findFirst({
        where: {
            name: parsedData.data.name,
            password: parsedData.data.password
        }
    })

    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return
    }



    const token = jwt.sign({
        userId: user?.id,
        username: user?.name
    }, JWT_SECRET)

    res.json({
        token
    })
})

app.post('/room', middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body)
  if(!parsedData.success){
    res.json({
      message: "Incorrect Inputs"
    })
    return
  }

  //@ts-ignore
  const userId = req.userId


  try{
    const room = await prismaClient.room.create({
        data: {
            slug: parsedData.data.name,
            adminId: userId
        }
    })

    res.json({
        roomId: parsedData.data.name
    })
  } catch(e) {
    res.status(411).json({
        message: "Room already exists with this name"
    })
  }
})

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });


    res.json({
        room
    })
})

app.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true
            }
        });

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        res.json({
            username: user.name
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "An error occurred"
        });
    }
});

app.listen(3001)