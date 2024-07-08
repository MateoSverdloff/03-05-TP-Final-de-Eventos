import express from "express";
import cors    from "cors";
import CategorieRouter from "./controllers/categorie-controller.js"
import UserRouter from "./controllers/user-controller.js"
import LocationRouter from "./controllers/locations-controller.js"
import EventRouter from "./controllers/event-controller.js"
import EventEnrollment from "./controllers/enrollments-controller.js"
import ProvinceRouter from "./controllers/province-controller.js"
//...
const app  = express();
const port = 3000;
//...
// Inclusión de los Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/event-category', CategorieRouter);
app.use('/api/user', UserRouter);
app.use('/api/event-location', LocationRouter);
app.use('/api/event', EventRouter);
app.use('/api/event', EventEnrollment);
app.use('/api/province', ProvinceRouter);


app.listen(port, () => {
  console.log(`"server" Listening on port ${port}`);
})