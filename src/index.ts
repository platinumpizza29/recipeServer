import { Elysia } from "elysia";
import {cors} from "@elysiajs/cors";
import recipeRoute from "./routes/recipeRoute";

const app = new Elysia()
app.use(cors())
app.use(recipeRoute)

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server started on port", port)
})