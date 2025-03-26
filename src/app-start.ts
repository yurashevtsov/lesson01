import express, { Express } from "express";
import { videosRouter } from "./videos/routers/videos.router";

export function startApp(app: Express): Express {
  app.use(express.json());
  app.use("/api/videos", videosRouter); // /homework_01/api/videos
  return app;
}
