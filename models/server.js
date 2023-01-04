import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    // Listen
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }

    //Routes
    routes() {
       this.app.use( this.userPath, userRoutes );
    }
    // Middlewares
    middlewares() {
        // CORS
        this.app.use(cors());
        // Body parser
        this.app.use(express.json());
        // Public directory
        this.app.use(express.static('public'));
    }
}