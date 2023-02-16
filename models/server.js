import express from "express";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";
import {dbConnection} from "../database/config.db.js";
import authRoutes from "../routes/auth.routes.js";
import categoriesRoutes from "../routes/categories.routes.js";
import productsRoutes from "../routes/products.routes.js";
import searchRoutes from "../routes/search.routes.js";
import uploadsRouter from "../routes/uploads.routes.js";
import fileUpload from "express-fileupload/lib/index.js"

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            search:     '/api/search',
            categories: '/api/categories',
            users:      '/api/users',
            products:   '/api/products',
            uploads:     '/api/uploads'
        }

        // Connect to database
         this.dbConnection().then();

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
       this.app.use( this.paths.auth, authRoutes );
       this.app.use( this.paths.users, userRoutes );
       this.app.use( this.paths.search, searchRoutes );
       this.app.use(this.paths.products, productsRoutes)
       this.app.use( this.paths.categories, categoriesRoutes );
        this.app.use( this.paths.uploads, uploadsRouter );
    }
    // Middlewares
    middlewares() {
        // CORS
        this.app.use(cors());
        // Body parser
        this.app.use(express.json());
        // Public directory
        this.app.use(express.static('public'));

        //Upload File
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    async dbConnection() {
        await dbConnection();
    }
}
