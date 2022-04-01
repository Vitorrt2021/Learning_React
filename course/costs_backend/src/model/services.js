const client = require("../dbConnection");

const servicesRequisitions = {
  insertServiceDB: async (project_id, name, cost, description) => {
    try {
      const result = await client.query(`  
            INSERT INTO services (project_id,name,cost,description)
            VALUES (${project_id},'${name}',${cost},'${description}')
            RETURNING (id)
      `);
      return result.rows[0].id;
    } catch (e) {
      console.log(e);
    }
  },
  getService: async (service_id, user_id) => {
    try {
      const result = await client.query(`                           
        SELECT 
            se.id,
            se.project_id,
            se.name,
            se.cost,
            se.description
        FROM services as se
        INNER JOIN projects ON projects.id = se.project_id AND projects.user_id = ${user_id}
        WHERE se.id = ${service_id} AND se.delete_at IS NULL              
      `);
      const rows = result.rows[0];
      if (rows) {
        return rows;
      }
      return false;
    } catch {
      (e) => {
        console.log(e);
        return false;
      };
    }
  },
  getServices: async (project_id, user_id) => {
    try {
      const result = await client.query(`
        SELECT 
            se.id,
            se.project_id,
            se.name,
            se.cost,
            se.description
        FROM services as se
        INNER JOIN projects ON projects.id = se.project_id AND projects.user_id = ${user_id}
        WHERE se.project_id = ${project_id} AND se.delete_at IS NULL
      `);
      const rows = result.rows;
      return rows;
    } catch {
      (e) => {
        console.log(e);
        return false;
      };
    }
  },
  deleteService: async (service_id) => {
    try {
      const result = await client.query(`
        UPDATE services
        SET delete_at = CURRENT_DATE
        WHERE id = ${service_id}
        RETURNING (id) 
      `);
      if (result.rows[0].id) {
        return true;
      }
      return false;
    } catch {
      (e) => {
        console.log(e);
        return false;
      };
    }
  },
};
module.exports = servicesRequisitions;
