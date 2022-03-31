const res = require("express/lib/response");
const client = require("../dbConnection");

const userRequisitions = {
  getUser: async (id) => {
    try {
      const result = await client.query(`
            SELECT email,id,first_name, last_name FROM users
            WHERE id = ${id}               
      `);
      return result.rows[0];
    } catch {
      (e) => {
        console.log(e);
      };
    }
  },
  getByEmail: async (email) => {
    try {
      const result = await client.query(`
              SELECT email,id,password,first_name, last_name FROM users
              WHERE email = '${email}'               
        `);
      return result.rows;
    } catch {
      (e) => {
        console.log(e);
      };
    }
  },
  getUsers: async () => {
    try {
      const result = await client.query(
        "SELECT email,id,first_name, last_name FROM users"
      );
      const rows = result.rows;
      return rows;
    } catch (e) {
      console.log(e);
    }
  },
  insertUserDB: async (email, password, first_name, last_name) => {
    try {
      const result = await client.query(`  
            INSERT INTO users (email,password,first_name,last_name)
            VALUES ('${email}','${password}','${first_name}','${last_name}')
            RETURNING (id)
        `);
      return result.rows[0].id;
    } catch (e) {
      console.log(e);
    }
  },

  haveEmailInBD: async (email) => {
    try {
      const result = await client.query(`  
            SELECT (id) FROM users
            WHERE email = '${email}'
        `);
      const rows = result.rows;
      if (rows.length === 0) {
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  },
};
module.exports = userRequisitions;
