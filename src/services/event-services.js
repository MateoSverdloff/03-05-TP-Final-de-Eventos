import EventRepository from '../repositories/event-repository.js';
import EnrollmentRepository from '../repositories/enrollments-respoitory.js'

export default class EventService {
    
  getAllAsync = async (name, tag, description, category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) => {
    console.log("paso1")
    const repo = new EventRepository();
    const returnArray = await repo.getAllAsync(name, tag, description, category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
    return returnArray;
  }
  
  getByIdAsync = async (id) => {
    const repo = new EventRepository();
    const returnArray = await repo.getByIdAsync(id);
    return returnArray.length > 0
      ? [{ success: true, response: returnArray }, 200]
      : [{ success: false, message: 'No existe un evento con ese ID' }, 404];
  }
  
  getEventCategory = async (id) => {
    const repo = new EventRepository();
    const returnArray = await repo.getEventCategory(id);
  
    if (returnArray && (Array.isArray(returnArray) ? returnArray.length > 0 : Object.keys(returnArray).length > 0)) {
      return [{ success: true, response: returnArray }, 200];
    } else {
      return [{ success: false, message: 'No existe un evento con ese ID' }, 404];
    }
  }
  

   getEventDetails = async (id) => {
    try {
        const repo = new EventRepository();
        const returnArray = await repo.getEventDetails(id);
        
        if (!returnArray) {
            return [{ success: false, message: 'No existe un evento con ese ID' }, 404];
        }
        
        return [{ success: true, response: returnArray }, 200];
    } catch (error) {
        if (error.message === 'ID inválido') {
            return [{ success: false, message: 'El ID proporcionado no es válido' }, 400];
        }
        return [{ success: false, message: 'Error al obtener los detalles del evento' }, 500];
    }
  }
   createAsync = async (entity, id_user) => {
     const repo = new EventRepository();
     const returnArray = await repo.createAsync(entity, id_user);
     return returnArray;
   }

   update2Async = async (entity) => {
     const repo = new EventRepository();
     const returnArray = await repo.update2Async(entity);
     return returnArray;
   }

   updateAsync = async (id_evento, id_user) => {
    const repo = new EnrollmentRepository();
    const returnArray = await repo.updateAsync(id_evento, id_user);
    return returnArray;
  }
  
   deleteByIdAsync = async (id) => {
     const repo = new EventRepository();
     const returnArray = await repo.deleteByIdAsync(id);
     return returnArray;
   }

   getCategory = async (category) => {
    const repo = new EventRepository();
    const returnArray = await repo.getCategory(category);
    return returnArray;
  }

   getTag = async (tag) => {
    const repo = new EventRepository();
    const returnArray = await repo.getTag(tag);
    return returnArray;
  }

}