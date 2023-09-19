import express from "express";
import path from "path";

import { userEndpoints } from "./user/infra/UserController";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

userEndpoints(app);

export default app;
