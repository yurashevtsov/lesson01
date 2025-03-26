import { Router, Request, Response } from "express";
import { db } from "../../db/in-memory.db";
import { HttpStatus } from "../../core/types/http-statuses";
import { VideoCreateDto } from "../dto/video.create-dto";
import { Video, Resolutions } from "../types/video";
import { addDaysToDate } from "../../core/utils/helpers";
import { videoCreateDtoValidation } from "../validation/videoCreateDtoValidation";
import { createErrorMessages } from "../../core/utils/error.utils";
import { videoUpdateDtoValidation } from "../validation/videoUpdateDtoValidation";

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
    // 1.validate input
    const errors = videoCreateDtoValidation({
      title: req.body.title,
      author: req.body.author,
      availableResolutions: req.body.availableResolutions,
    });

    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }

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
    // 0.find video
    const id = Number.parseInt(req.params.videoId);
    const index = db.videos.findIndex((video) => video.id === id);

    // 1.check if video exists
    if (index === -1) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    // 2.validate
    const errors = videoUpdateDtoValidation({
      title: req.body.title,
      author: req.body.author,
      availableResolutions: req.body.availableResolutions,
      canBeDownloaded: req.body.canBeDownloaded,
      minAgeRestriction: req.body.minAgeRestriction,
      publicationDate: req.body.publicationDate,
    });

    // 3.if any errors - send errors - return
    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
      return;
    }
    // 4.find video
    const videoToUpdate = db.videos[index];
    // 5.update fields
    videoToUpdate.title = req.body.title;
    videoToUpdate.author = req.body.author;
    videoToUpdate.availableResolutions = req.body.availableResolutions;
    videoToUpdate.canBeDownloaded = req.body.canBeDownloaded;
    videoToUpdate.minAgeRestriction = req.body.minAgeRestriction;
    videoToUpdate.publicationDate = req.body.publicationDate;

    // 6.send sendStatus(204)
    res.sendStatus(HttpStatus.NoContent);
  })
  .delete("/:videoId", (req: Request, res: Response) => {
    //  1. find video by id
    const id = Number.parseInt(req.params.videoId);
    const index = db.videos.findIndex((video) => video.id === id);
    //  2. no video -> 404
    if (index === -1) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    // 3. delete video from db by its index
    db.videos.splice(index, 1);
    // 4. send 204
    res.sendStatus(HttpStatus.NoContent);
  });

export { videosRouter };
