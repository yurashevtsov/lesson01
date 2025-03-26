import { Router, Request, Response } from "express";
import { db } from "../../db/in-memory.db";
import { HttpStatus } from "../../core/types/http-statuses";

const videosRouter = Router({});

videosRouter
  .get("/", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(db.videos);
  })
  .get("/:videoId", (req: Request, res: Response) => {})
  .post("/", (req: Request, res: Response) => {})
  .put("/:videoId", (req: Request, res: Response) => {})
  .delete("/:videoId", (req: Request, res: Response) => {});

export { videosRouter };
