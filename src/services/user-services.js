import UserRepository from '../repositories/user-repository.js';

export default class UserService {
  getAllAsync = async () => {
    const repo = new UserRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }

  getByIdAsync = async (id) => {
    const repo = new UserRepository();
    const returnArray = await repo.getByIdAsync(id);
    return returnArray;
  }

  createAsync = async (entity) => {
    const repo = new UserRepository();
    const rowsAffected = await repo.createAsync(entity);
    return rowsAffected;
  }

  updateAsync = async (entity) => {
    const repo = new UserRepository();
    const returnArray = await repo.updateAsync(entity);
    return returnArray;
  }
  
  deleteByIdAsync = async (id) => {
    const repo = new UserRepository();
    const returnArray = await repo.deleteByIdAsync(id);
    return returnArray;
  }

  getByUserNameAndPassword = async (entity) => {
    const repo = new UserRepository();
    const returnArray = await repo.getByUserNameAndPassword(entity);
    return returnArray;
  }

}
