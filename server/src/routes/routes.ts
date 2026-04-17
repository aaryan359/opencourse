import { Router } from "express";
import adminRouter from "./admin.route";
import authRouter from "./auth.route";
import courseRouter from "./course.route";
import topicRouter from "./topic.route";
import videoRouter from "./video.route";
import userRouter from "./user.route";

const router = Router();



router.use("/admin", adminRouter);
router.use("/auth", authRouter);

router.use("/course", courseRouter);
router.use("/topic", topicRouter);

router.use("/video", videoRouter);
router.use("/user", userRouter);

export default router;