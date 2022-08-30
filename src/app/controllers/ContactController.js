const contactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await contactRepository.findAll(orderBy);

    return response.status(200).json(contacts);
  }

  async show(request, response) {
    // Obter um registro
    const { id } = request.params;
    const contact = await contactRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.status(200).json(contact);
  }

  async store(request, response) {
    // Criar novo registro
    const { name, email, phone } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const existsContact = await contactRepository.findByEmail(email);

    if (existsContact) {
      return response.status(400).json({ error: 'Email already in use' });
    }

    const newContact = await contactRepository.save({ name, email, phone });
    return response.status(201).json(newContact);
  }

  async update(request, response) {
    // Editar registro
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const existsContactById = await contactRepository.findById(id);
    if (!existsContactById) {
      return response.status(400).json({ error: 'User not exist' });
    }

    const existsContact = await contactRepository.findByEmail(email);
    if (existsContact && existsContact.id !== id) {
      return response.status(400).json({ error: 'Email already in use' });
    }

    const updatedContact = await contactRepository.update(id, {
      name, email, phone, category_id,
    });
    return response.status(200).json(updatedContact);
  }

  async delete(request, response) {
    // Apagar registro

    const { id } = request.params;
    const contact = await contactRepository.findById(id);

    if (!contact) {
      // 404: Not Found
      return response.status(404).json({ error: 'Contact not found' });
    }

    await contactRepository.delete(id);

    // 204: No Content
    return response.sendStatus(204);
  }
}

module.exports = new ContactController();
