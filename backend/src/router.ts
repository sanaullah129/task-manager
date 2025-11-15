import { Router, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { requireAuth } from "./middleware/auth";

const router = Router();

// Health check
router.get("/health", (_req: Request, res: Response) => {
  res.send("Server is up and running");
});

// Secure token validation using existing auth middleware
router.get("/check-token", requireAuth, (req: Request, res: Response) => {
  // `requireAuth` should attach the decoded user to the request (e.g. req.user)
  res.status(200).json({ message: "Token is valid", user: (req as any).user });
});

// Mount feature routes
router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);

export default router;
