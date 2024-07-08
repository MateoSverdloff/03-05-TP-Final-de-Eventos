import EventRepository from '../repositories/event-repository.js';
import EnrollmentRepository from '../repositories/enrollments-respoitory.js'

export default class EventService {
    
  getAllAsync = async (name, tag, description, category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) => {
    console.log("paso1")
    const repo = new EventRepository();
    const returnArray = await repo.getAllAsync(name, description, category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
    return returnArray;
  }
  
   getByIdAsync = async (id) => {
     const repo = new EventRepository();
     const returnArray = await repo.getByIdAsync(id);
     return response.length > 0
				? [{ success: true, response: response }, 200]
				: [{ success: false, message: 'No existe un evento con ese ID' }, 404];
     return returnArray;
   }


   getEventDetails = async (id) => {
    const repo = new EventRepository();
    const returnArray = await repo.getEventDetails(id);
    return returnArray;
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