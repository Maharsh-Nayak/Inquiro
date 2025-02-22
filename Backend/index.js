import express from 'express';

const app = express();

let port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});