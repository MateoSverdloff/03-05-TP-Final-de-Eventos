import {Router} from 'express';
import UserService from "./../services/user-services.js"
import jwt from 'jsonwebtoken';
const router = Router();
const svc    = new UserService();		// Instanciación del Service.

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
    let respuesta = null;
    let entity = req.body;
   
    if (!entity.first_name || !entity.last_name){
      respuesta = res.status(400).send('Los campos first_name y last_name son obligatorios.')
    }
    const emailVali= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailVali.test(entity.username)) {
      respuesta = res.status(400).send('El email (username) no es valido')
    }
    if(entity.password.length < 3) {   
      respuesta = res.status(400).send('El campo password debe contener al menos 3 caracteres')
    }
  
  
    if (respuesta == null) {
      const rowsAffected = await svc.createAsync(entity);
      if (rowsAffected > 0 ){
        respuesta = res.status(200).json(rowsAffected);
      } else {
        respuesta = res.status(500).send(`Error interno.`);
      }
    } else{
      // ya respuesta tiene algun error!
    }


  
    return respuesta;
  });

  router.put('', async (req, res) => {
    let respuesta = null;
    let entity = req.body;
   
    if (!entity.first_name || !entity.last_name){
      respuesta = res.status(400).send('Los campos first_name y last_name son obligatorios.')
    }
    const emailVali= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailVali.test(entity.username)) {
      respuesta = res.status(400).send('El email (username) no es valido')
    }
    if(entity.password.length < 3) {   
      respuesta = res.status(400).send('El campo password debe contener al menos 3 caracteres')
    }
  
  
    if (respuesta == null) {
      const rowsAffected = await svc.createAsync(entity);
      if (rowsAffected > 0 ){
        respuesta = res.status(200).json(rowsAffected);
      } else {
        respuesta = res.status(500).send(`Error interno.`);
      }
    } else{
      // ya respuesta tiene algun error!
    }
  });
  
  router.delete('/:id', async (req, res) => {
    let respuesta;
    let entity = req.params.id;

    const returnEntity = await svc.getByIdAsync(entity);
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

  router.post('/login', async (req, res) => {
    let respuesta;
    let entity = req.body;
    const returnEntity = await svc.getByUserNameAndPassword(entity);
    console.log ('returnEntity xxxx', returnEntity);
    let objRespuesta = {
      "success": false, 
      "message": "El email es invalido.",
      "token"  : ""
   }
   const payload = returnEntity;

   const secretKey= 'backAtIt100$';

   const options= {
    expiresIn: '7d',
    issuer: 'losCorridos'
   }



    if (returnEntity != null){
      objRespuesta.success = true;
      objRespuesta.message = 'yey!'
      const token = jwt.sign(payload, secretKey, options)
      console.log(token)
      objRespuesta.token= token;
      respuesta = res.status(200).json(objRespuesta);
    } else {
      respuesta = res.status(401).send(objRespuesta);
    }
    return respuesta;
  });

  //export default objRespuesta;
  export default router;