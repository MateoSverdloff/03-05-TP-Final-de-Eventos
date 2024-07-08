import {Router} from 'express';
import ProvinceService from './../services/province-services.js';
import authMiddleware from '../middlewares/auth-middleware.js';
const router = Router();
const svc    = new ProvinceService();		// Instanciación del Service.

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
    const returnArray = await svc.getByIdProvince(id);
    if (returnArray != null){
      respuesta = res.status(200).json(returnArray);
    } else {
      respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
   });

//    router.get('/:id/eveprovince', authMiddleware, async (req, res, next) => {
//     let respuesta;
//     let id = req.params.id;
//     let entity = req.body;
//     const returnArray = await svc.getByIdAsync(id);
//     if (returnArray != null){
//       respuesta = res.status(200).json(returnArray);
//     } else {
//       respuesta = res.status(500).send(`Error interno.`);
//     }
//     return respuesta;
//   });

router.post('', async (req, res) => {
    let respuesta;
    let entity = req.body;
    const returnArray = await svc.createAsync(entity);
    if (returnArray != null){
      if (!entity.name){
        respuesta = res.status(400).send('Los campos name estan vacios.')
      }
      // <
    if(entity.name.length < 3){
      respuesta = res.status(400).send('Los campos name tienen menos de 3 caracteres.')
    }
    // getByIdLocation
    const [eventLocation] = await svc.getByIdLocation(entity.id_event_location);
			if (max_assistance > eventLocation.max_capacity) {
				return [
					{
						success: false,
						message:
							'La asistencia máxima no puede ser mayor que la capacidad máxima del lugar',
					},
					400,
				];
			}
      if (entity.price < 0 || entity.duration_in_minutes < 0) {
				return [
					{
						success: false,
						message: 'El precio y la duración en minutos no pueden ser valores negativos',
					},
					400,
				];
			}
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