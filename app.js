import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import SubscriptionRouter from './routes/subscription.routes.js';
import connectDB from './Database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', SubscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res)=>{
   res.send('welcome to Subscription Tracker API!'); 
});

app.listen(PORT, async ()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectDB();
});

export default app;