// here we are using hono as it has predefined set of APIs we can use directly like express

import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { userRouter } from './routes/user'
import { bookRouter } from './routes/blog'
import { decode, jwt, sign, verify } from 'hono/jwt'
import {cors} from 'hono/cors'
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string, 
    JWT_SECRET: string,
  }
  Variables: {
    userId: string; // Add userId as a variable
  };
}>()
app.use('*', cors())
// has all user related api's like signin, signup 
app.route('/api/v1/user', userRouter)
// has all activity related to the blogs like create, update, list, delete
app.route('/api/v1/book', bookRouter)



export default app


// steps to deploy backend
// npx wrangler login 
// npx wrangler whoami
// npx wrangler deploy
// hurry! backend deployed, use the link in terminal in palce of local host you can access the api 