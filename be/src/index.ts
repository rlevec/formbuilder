import express from "express";

import cors from "cors"

import cookieParser from "cookie-parser"

import session from "express-session";
import connectPgSimple from "connect-pg-simple";

import authRoutes from "./routes/auth.routes";
import formdataRoutes from "./routes/formdata.routes"
import formbuilderRoutes from "./routes/formbuilder.routes"

import { errorMiddleware } from "./middlewares/error.middleware";

import { initPostgresDb } from "./postgres/init.postgres";

import pool from "./postgres/pool.postgres"

async function startServer() {
  try {
    await initPostgresDb();

    const app = express();
    const PORT = 6060;

    app.use(cors());

    app.use(cookieParser());

    app.use(express.json());

    const PgSession = connectPgSimple(session);

    app.use(
      session({
        store: new PgSession({
          pool,
          tableName: "session",
        }),
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false, // true in production (HTTPS)
          sameSite: "lax",
          maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        },
      })
    );

    app.get("/", (req, res, next) => {
       console.log("GLOBAL HIT:", req.method, req.url);
  next();
    });

    app.use("/api/formdata", formdataRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/formbuilder", formbuilderRoutes)

    app.use(errorMiddleware);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();