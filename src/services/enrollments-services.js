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

  getByEventId = async (id_event, first_name, last_name, username, attended, rating) => {
    const repo = new EnrollmentsRepository();
    const returnArray = await repo.getByEventId(id_event, first_name, last_name, username, attended, rating);
    return returnArray;
  }
  patchByIdAsync = async (id_event, rating) => {
    const repo = new EnrollmentsRepository();
    const returnArray = await repo.patchByIdAsync(id_event, rating);
    return returnArray;
  }
}
