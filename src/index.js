import { app } from './app.js';
import connectDB from './db/db.js';
import  dotenv from 'dotenv';
dotenv.config(
    {
        path: './env'
    }
);
connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error('Database connection failed:', error);    
});
















































// import mongoose from 'mongoose';
// import { DB_NAME } from './constants';
// import express from 'express';
// const app = express();
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//     app.on('error', (err) => {
//       console.error('Error occurred:', err);
//       throw err;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port ${process.env.PORT}`);
//     }
//     );
// }
//    catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     }
//   })()