import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { Env } from "./config/env.js";
import { initDB } from "./db/init.js";

(async () => {
    await initDB();
    app.listen(Env.PORT, () => {
        console.log(`Backend escuchando en ${Env.PORT}`);
    });
})();