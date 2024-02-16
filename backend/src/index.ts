import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import usersRoute from './routes/usersRoute';
import authRoutes from './routes/authRoute';
import myHotelRoutes from './routes/my-hotels';
import cookieParser from 'cookie-parser';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoute);
app.use('/api/my-hotel', myHotelRoutes);

app.get("*", (req: Request,res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.listen(3000, () => console.log('Server running on port: 3000'));
