import LocationsRepository from '../repositories/locations-repository.js';

export default class LocationsService {
  getAllAsync = async () => {
    const repo = new LocationsRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }

  getByIdLocation = async (id) => {
    const repo = new LocationsRepository();
    const returnArray = await repo.getByIdLocation(id);
    return returnArray;
  }

  getByIdAsync = async (id) => {
    const repo = new LocationsRepository();
    const returnArray = await repo.getByIdAsync(id);
    return returnArray;
  }

  createAsync = async (entity, id_user) => {
    const repo = new LocationsRepository();
    const returnArray = await repo.createAsync(entity, id_user);
    return returnArray;
  }

  updateAsync = async (entity) => {
    const repo = new LocationsRepository();
    const returnArray = await repo.updateAsync(entity);
    return returnArray;
  }
 
  deleteByIdAsync = async (id) => {
    const repo = new LocationsRepository();
    const returnArray = await repo.deleteByIdAsync(id);
    return returnArray;
  }
}