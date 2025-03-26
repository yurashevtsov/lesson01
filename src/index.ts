import express, { Express } from "express";
import { startApp } from "./app-start";

const PORT = process.env.PORT || 5001;
const app: Express = express();
startApp(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
