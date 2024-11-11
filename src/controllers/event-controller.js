import {Router} from 'express';
import EventService from './../services/event-services.js';
import authMiddleware from '../middlewares/auth-middleware.js';
const router = Router();
const svc    = new EventService();


router.get('', async (req, res) => {
    let respuesta;

    const tag = await svc.getTag(req.query.tag);
    const category = await svc.getCategory(req.query.category)
    let name = req.query.name;
    let description = req.query.description;
    let id_creator_user = req.query.id_creator_user;
    let id_event_location = req.query.id_event_location;
    let duration_in_minutes = req.query.duration_in_minutes;
    let price = req.query.price;
    let enabled_for_enrollment = req.query.enabled_for_enrollment;
    let max_assistance = req.query.max_assistance;
    let start_date = req.query.start_date;

    const returnArray = await svc.getAllAsync(name, tag, description, category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
  });

  // router.get('/:id', async (req, res) => {
  //   let respuesta;
  //   let id = req.params.id;
  //   console.log(id)
  //   const returnArray = await svc.getByIdAsync(id);
  //   if (returnArray != null){
  //     respuesta = res.status(200).json(returnArray);
  //   } else {
  //     respuesta = res.status(500).send(`Error interno.`);
  //   }
  //   return respuesta;
  //  });
   

   router.post('', authMiddleware, async (req, res, next) => { 
    let respuesta;
    let entity = req.body;
    let id_user = req.user.id;
    const returnArray = await svc.createAsync(entity, id_user);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
  });

  router.put('', authMiddleware, async (req, res, next) => {
    let respuesta;
    let entity = req.body;
    const returnArray = await svc.update2Async(entity);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
  });

  router.delete('/:id', authMiddleware, async (req, res, next) => {
    let respuesta;
    let entity = req.params.id;

    const returnEntity = await svc.deleteByIdAsync(entity);
    if (returnEntity == null){
      respuesta = res.status(404).json();
    }
      const returnArray = await svc.deleteByIdAsync(entity);
      if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
      } else {
        respuesta = res.status(500).send(`Error interno.`);
      }
      return respuesta;
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await svc.getEventDetails(id);
        if (response !== null) {
            res.status(200).json({ success: true, response });
        } else {
            res.status(404).json({ success: false, message: 'No existe un evento con ese ID' });
        }
    } catch (error) {
        console.error('Error en el manejo de la ruta:', error);
        res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
});

router.get('/category/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const response = await svc.getEventCategory(id);
      if (response !== null) {
          res.status(200).json({ success: true, response });
      } else {
          res.status(404).json({ success: false, message: 'No existe un evento con ese category ID' });
      }
  } catch (error) {
      console.error('Error en el manejo de la ruta:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});

  router.get('/:tag/tags', async (req, res) => {
    const returnEntity = await svc.getTag(req.params.tag);
    if (returnEntity == null){
      let respuesta = res.status(404).json();
    }
      const returnArray = await svc.getTag(req.params.tag);
      if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
      } else {
        respuesta = res.status(500).send(`Error interno.`);
      }
      return respuesta;
  });
  export default router;