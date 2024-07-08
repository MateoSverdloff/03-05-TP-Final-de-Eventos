import EventRepository from '../repositories/event-repository.js';
import EnrollmentRepository from '../repositories/enrollments-respoitory.js'

export default class EventService {
    
  getAllAsync = async (name, tag, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) => {
    console.log("paso1")
    const repo = new EventRepository();
    const returnArray = await repo.getAllAsync(name, tag, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
    return returnArray;
  }
  
   getByIdAsync = async (id) => {
     const repo = new EventRepository();
     const returnArray = await repo.getByIdAsync(id);
     return returnArray;
   }


   getEventDetails = async (id) => {
    const repo = new EventRepository();
    const returnArray = await repo.getEventDetails(id);
    return returnArray;
  }
   createAsync = async (entity) => {
     const repo = new EventRepository();
     const returnArray = await repo.createAsync(entity);
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

}