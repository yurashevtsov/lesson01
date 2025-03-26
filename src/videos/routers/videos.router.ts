import { Router, Request, Response } from "express";
import { db } from "../../db/in-memory.db";
import { HttpStatus } from "../../core/types/http-statuses";
import { VideoCreateDto } from "../dto/video.create-dto";
import { Video, Resolutions } from "../types/video";
import { addDaysToDate } from "../../core/utils/helpers";

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
  .post("/", (req: Request<{}, {}, VideoCreateDto>, res: Response) => {
    // 1.validate
    // 2.if any errors - send errors - return
    // 3.create new video
    const newVideo: Video = {
      id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
      title: req.body.title,
      author: req.body.author,
      availableResolutions: req.body.availableResolutions,
      canBeDownloaded: false, // default - false
      minAgeRestriction: null, // default - null
      createdAt: new Date().toISOString(), // string($date-time)
      publicationDate: addDaysToDate(new Date(), 1).toISOString(), // default is + 1 day from now on
    };
    // 5. add to db
    db.videos.push(newVideo);
    // 4.send new video
    res.status(HttpStatus.Created).send(newVideo);
  })
  .put("/:videoId", (req: Request, res: Response) => {
    // 0.find video -
    // 1.no video -> sendStatus(404)
    // 2.validate
    // 3.if any errors - send errors - return
    // 4.update found video
    // 5.send sendStatus(204)
    res.status(HttpStatus.InternalServerError).send("Not implemented yet");
  })
  .delete("/:videoId", (req: Request, res: Response) => {
    //   find video by id
    //   no video -> 404
    //   find index or filter all results to include all that has different id
    //   send 204
    res.status(HttpStatus.InternalServerError).send("Not implemented yet");
  });

export { videosRouter };
