const categoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const categories = await categoryRepository.findAll();
    return response.status(200).json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    const existsCategory = await categoryRepository.findByName(name);

    if (existsCategory) {
      return response.status(400).json({ error: `Category ${name} already exists` });
    }

    const category = await categoryRepository.save({ name });
    return response.status(201).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    await categoryRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();
