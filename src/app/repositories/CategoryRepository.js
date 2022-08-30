const db = require('../database');

class CategoryRepository {
  async findAll() {
    const row = await db.query('SELECT * FROM categories ORDER BY name');
    return row;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM categories WHERE name = $1', [name]);
    return row;
  }

  async save({ name }) {
    const [row] = await db.query('INSERT INTO categories(name) VALUES($1) RETURNING *', [name]);
    return row;
  }

  async delete(id) {
    await db.query('DELETE FROM categories WHERE id = $1', [id]);
  }
}

module.exports = new CategoryRepository();
