import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.utils';
import {paymentRoute,webhookRouter, userRouter ,shopRouter, AuthRouter, productRouter, cartRouter} from './routes/exports';



dotenv.config()

const portFromEnv = process.env.PORT;
if (!portFromEnv) {
    console.error("Error: PORT environment variation is not set");
    process.exit(1);
  }

  const PORT:number = parseInt(portFromEnv, 10);
if(isNaN(PORT)){
    console.error("Error: PORT environment variable is not a valid number");
    process.exit(1);
}

const app = express();
const corsOptions = {
    origin: "*", // Allow requests from all origins (adjust for production)
    credentials: true, // Allow cookies for CORS requests
    allowedHeaders: "*", // Allow all headers (adjust as needed)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all HTTP methods
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())


app.use("/api/v1/user", userRouter);
app.use("/api/v1/payments", paymentRoute);
app.use("/api/v1/webhooks", webhookRouter);
app.use("/api/v1/shop", shopRouter);
app.use('/api/v1/auth', AuthRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server is listening at port ${PORT}`);
    
})  