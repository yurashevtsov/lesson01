import express, { Express } from "express";
import { videosRouter } from "./videos/routers/videos.router";
import { testingRouter } from "./testing/routers/testing.router";

export function startApp(app: Express): Express {
  app.use(express.json());
  app.use("/api/videos", videosRouter); // /homework_01/api/videos
  app.use("/api/testing", testingRouter); // /homework_01/api/testing
  return app;
}
