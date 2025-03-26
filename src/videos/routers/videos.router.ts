import { Router, Request, Response } from "express";
import { db } from "../../db/in-memory.db";
import { HttpStatus } from "../../core/types/http-statuses";
import { Video } from "../types/video";

const videosRouter = Router({});

videosRouter
  .get("/", (req: Request, res: Response) => {
    res.status(HttpStatus.Ok).send(db.videos);
  })
  .get("/:videoId", (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.videoId);
    const foundVideo = db.videos.find((video) => video.id === id);

    if (!foundVideo) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }

    res.status(HttpStatus.Ok).send(foundVideo);
  })
  .post("/", (req: Request, res: Response) => {})
  .put("/:videoId", (req: Request, res: Response) => {})
  .delete("/:videoId", (req: Request, res: Response) => {});

export { videosRouter };
