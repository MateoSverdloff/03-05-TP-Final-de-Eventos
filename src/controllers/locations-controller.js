import {Router} from 'express';
import LocationsService from './../services/locations-services.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import objRespuesta from './user-controller.js'
const router = Router();
const svc    = new LocationsService();		// Instanciación del Service.

router.get('', async (req, res) => {
  console.log("req")
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
  });
   router.get('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    console.log(id)
    const returnArray = await svc.getByIdLocation(id);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
   });

   router.get('/:id/:event-location', authMiddleware, async (req, res, next) => {
    let respuesta;
    let id = req.params.id;
    let entity = req.body;
    const returnArray = await svc.getByIdAsync(id);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
  });

  router.post('', authMiddleware, async (req, res, next) => { 
    let respuesta;
    let id_user = req.user.id;
    let entity = req.body;
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
    const returnArray = await svc.updateAsync(entity);
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

  export default router;