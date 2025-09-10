import express from 'express';
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import SubscriptionRouter from './routes/subscription.routes.js';
import connectDB from './Database/mongodb.js';


const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', SubscriptionRouter);

app.get('/', (req, res)=>{
   res.send('welcome to Subscription Tracker API!'); 
});

app.listen(PORT, async ()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectDB();
});

export default app;