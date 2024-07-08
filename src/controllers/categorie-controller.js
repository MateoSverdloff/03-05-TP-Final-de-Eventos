import {Router} from 'express';
import CategorieService from "./../services/categorie-services.js"
const router = Router();
const svc    = new CategorieService();		// Instanciación del Service.

router.get('', async (req, res) => {
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
    const returnArray = await svc.getByIdAsync(id);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
   });

   router.post('', async (req, res) => {
    let respuesta;
    let entity = req.body;
    const returnArray = await svc.createAsync(entity);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
  });

  router.put('', async (req, res) => {
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
  
  router.delete('/:id', async (req, res) => {
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