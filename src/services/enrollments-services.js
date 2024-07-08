import EnrollmentsRepository from '../repositories/enrollments-respoitory.js';

export default class EnrollmentService {

  createAsync = async (id_evento, id_user) => {
    const repo = new EnrollmentsRepository();
    const returnArray = await repo.createAsync(id_evento, id_user);
    return returnArray;
}


  deleteByIdAsync = async (id_user) => {
    const repo = new EnrollmentsRepository();
    const returnArray = await repo.deleteByIdAsync(id_user);
    return returnArray;
  }


  //aca falla 
  getByEventId = async (id_event, first_name, last_name, username, attended, rating) => {
    const repo = new EnrollmentsRepository();
    const response  = await repo.getByEventId(id_event, first_name, last_name, username, attended, rating);
    return response.length > 0
    ? [{ success: true, response: response }, 200]
    : [{ success: false, message: 'No existe un evento con ese ID' }, 404];
}


  patchByIdAsync = async (id_event, rating) => {
    const repo = new EnrollmentsRepository();
    const returnArray = await repo.patchByIdAsync(id_event, rating);
    return returnArray;
  }
}
