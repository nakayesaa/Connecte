import express from 'express';
import userRoutes from './routes/userRoutes';
import postRoutes from "./routes/postRoutes"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true             
}));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req,res)=>{
    res.json({
        message : "Fuck it, get rich"
    });
}); 
app.use('/auth', userRoutes); 
app.use('/api', postRoutes); 

app.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
})


