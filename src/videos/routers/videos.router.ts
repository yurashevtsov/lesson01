import { Router, Request, Response } from "express";
import { db } from "../../db/in-memory.db";

const videosRouter = Router({});

videosRouter
  .get("/", (req: Request, res: Response) => {
    res.status(200).send(db.videos);
  })
  .get("/:videoId", (req: Request, res: Response) => {
  })
  .post("/", (req: Request, res: Response) => {
  })
  .put("/:videoId", (req: Request, res: Response) => {
  })
  .delete("/:videoId", (req: Request, res: Response) => {
  });

export { videosRouter };
