import express, { Express } from "express";
import { videosRouter } from "./videos/routers/videos.router";

export function startApp(app: Express): Express {
  app.use(express.json());
  app.use("/homework_01/api/videos", videosRouter);
  return app;
}
