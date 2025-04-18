import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/user', userRouter)


export default app 