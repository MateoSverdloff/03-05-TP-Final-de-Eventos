import { Router } from 'express';
import EnrollmentService from './../services/enrollments-services.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = Router();
const svc = new EnrollmentService();

router.post('/:id/enrollment', authMiddleware, async (req, res, next) => {
    let respuesta;
    let id_evento = req.params.id;
    let id_user = req.user.id;
    try {
        const returnArray = await svc.createAsync(id_user, id_evento);
        if (returnArray != null) {
            respuesta = res.status(200).json(returnArray);
        } else {
            respuesta = res.status(500).send(`Error interno.`);
        }
    } catch (error) {
        console.error(error);
        respuesta = res.status(500).send(`Error interno.`);
    }
    return respuesta;
});

router.get('/:id/enrollment', async (req, res)=> {
    let response;
    let first_name = req.query.first_name;
    let id_event = req.params.id;
    let last_name = req.query.last_name;
    let username = req.query.username;
    let attended = req.query.attended;
    let rating = req.query.rating;

    //first_name, last_name, username, attended, rating
    //console.log('user:', id_user)
    try {
        const returnArray = await svc.getByEventId(id_event, first_name, last_name, username, attended, rating);
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

router.delete('/:id/enrollment', authMiddleware, async (req, res, next) => {
  let respuesta;
  let id_user = req.user.id;
  console.log('user:', id_user)
  try {
      const returnArray = await svc.deleteByIdAsync(id_user);
      if (returnArray != null) {
          respuesta = res.status(200).json(returnArray);
      } else {
          respuesta = res.status(500).send(`Error interno.`);
      }
  } catch (error) {
      console.error(error);
      respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
});

router.patch('/:id/enrollment/:rating', authMiddleware, async (req, res, next) => {
  let respuesta;
  let id_event = req.params.id;
  let rating = req.params.rating;
  console.log('id evetno y rating:', id_event, rating)
  try {
      const returnArray = await svc.patchByIdAsync(id_event, rating);
      if (returnArray != null) {
          respuesta = res.status(200).json(returnArray);
      } else {
          respuesta = res.status(500).send(`Error interno.`);
      }
  } catch (error) {
      console.error(error);
      respuesta = res.status(500).send(`Error interno.`);
  }
  return respuesta;
});


export default router;
