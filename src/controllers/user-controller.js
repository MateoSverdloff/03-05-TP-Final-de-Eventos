import { Router } from 'express';
import UserService from './../services/user-services.js';
import jwt from 'jsonwebtoken';

const router = Router();
const svc = new UserService();

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

  
  router.post('', async (req, res) => {
    let respuesta = null;
    let entity = req.body;
  
    console.log("Datos recibidos para registro:", entity);  // Log para verificar qué llega al backend
  
    // Validaciones
    if (!entity.first_name || !entity.last_name) {
      respuesta = res.status(400).send('Los campos first_name y last_name son obligatorios.');
    }
    const emailVali = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVali.test(entity.username)) {
      respuesta = res.status(400).send('El email (username) no es valido');
    }
    if (entity.password.length < 3) {
      respuesta = res.status(400).send('El campo password debe contener al menos 3 caracteres');
    }
  
    if (respuesta == null) {
      try {
        // Llamada a createAsync, que debería devolver un array con el usuario creado
        const returnArray = await svc.createAsync(entity);
        console.log("Resultado de la creación del usuario:", returnArray);  // Log para ver qué devuelve el servicio
  
        if (returnArray && returnArray.length > 0) {
          const newUser = returnArray[0];  // Suponiendo que el primer item es el usuario creado
          console.log("Usuario para el token:", newUser); // Log para verificar el usuario
  
          // Generación del token
          const payload = { id: newUser.id, username: newUser.username };
          const secretKey = 'backAtIt100$'; // Asegúrate de que esta clave sea segura
          const options = {
            expiresIn: '7d',  // Establece el tiempo de expiración según sea necesario
            issuer: 'losCorridos',
          };
  
          const token = jwt.sign(payload, secretKey, options);  // Generación del token
          console.log("Token generado:", token);  // Log para verificar el token
  
          const objRespuesta = {
            success: true,
            message: 'Registro exitoso',
            token,
          };
  
          // Enviamos la respuesta con el token
          return res.status(200).json(objRespuesta);
        } else {
          console.log("No se pudo crear el usuario.");
          return res.status(500).send('Error interno.');
        }
      } catch (error) {
        console.error("Error en la creación del usuario:", error);  // Log para capturar cualquier error durante el proceso
        return res.status(500).send('Error interno.');
      }
    }
  
    return respuesta;
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
    let objRespuesta = {
      "success": false,
      "message": "El email es invalido.",
      "token": ""
    };
  
    if (returnEntity != null) {
      const payload = { id: returnEntity.id, username: returnEntity.username };
      const secretKey = 'backAtIt100$';
      const options = { expiresIn: '7d', issuer: 'losCorridos' };
      const token = jwt.sign(payload, secretKey, options);
  
      console.log(token);  // Esto hará el console.log del token generado
  
      objRespuesta.success = true;
      objRespuesta.message = 'Yey!';
      objRespuesta.token = token;
      respuesta = res.status(200).json(objRespuesta);
    } else {
      respuesta = res.status(401).send(objRespuesta);
    }
  
    return respuesta;
  });
  

  //export default objRespuesta;
  export default router;