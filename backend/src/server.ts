import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { Env } from "./config/env";
import { initDB } from "./db/init";

(async () => {
    await initDB();
    app.listen(Env.PORT, () => {
        console.log(`Backend escuchando en ${Env.PORT}`);
    });
})();