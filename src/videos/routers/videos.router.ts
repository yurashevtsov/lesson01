import { Router, Request, Response } from "express";

const videosRouter = Router({});

videosRouter
  .get("/", (req: Request, res: Response) => {})
  .get("/:videoId", (req: Request, res: Response) => {})
  .post("/", (req: Request, res: Response) => {})
  .put("/:videoId", (req: Request, res: Response) => {})
  .delete("/:videoId", (req: Request, res: Response) => {});

export { videosRouter };
