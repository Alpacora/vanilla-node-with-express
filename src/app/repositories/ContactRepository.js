// const { v4 } = require('uuid');
const db = require('../database');

// let contacts = [
//   {
//     id: v4(),
//     name: 'Kaê Benning',
//     email: 'kae@mail.com',
//     phone: '+5581992534088',
//     category_id: v4(),
//   },
// ];

class ContactRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON contacts.category_id = categories.id
    ORDER BY contacts.name ${direction}`);
    return rows;
    // return new Promise((resolve) => { resolve(contacts); });
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      INNER JOIN categories ON contacts.category_id = categories.id
      WHERE contacts.id = $1
    `, [id]);
    return row;
    // return new Promise((resolve) => {
    //   resolve(contacts.find((currentContact) => currentContact.id === id));
    // });
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT *
      FROM contacts
      WHERE email = $1
    `, [email]);
    return row;
    // return new Promise((resolve) => {
    //   resolve(contacts.find((currentContact) => currentContact.email === email));
    // });
  }

  async save({ name, email, phone }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, email, phone]);
    return row;
    // return new Promise((resolve) => {
    //   const contact = {
    //     id: v4(),
    //     email,
    //     name,
    //     phone,
    //     category_id: v4(),
    //   };
    //   contacts.push(contact);
    //   resolve(contact);
    // });
  }

  async update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
    // return new Promise((resolve) => {
    //   const updatedContact = {
    //     id,
    //     name,
    //     email,
    //     phone,
    //   };

    //   contacts = contacts.map((contact) => (contact.id === id ? updatedContact : contact));
    //   resolve(contacts);
    // });
  }

  async delete(id) {
    await db.query('DELETE FROM contacts WHERE id = $1', [id]);
    //   return new Promise((resolve) => {
    //     contacts = contacts.filter((currentContact) => currentContact.id !== id);
    //     resolve();
    //   });
    // }
  }
}

module.exports = new ContactRepository();
