const { client_encoding } = require("pg/lib/defaults");
const client = require("../dbConnection");

const projectRequisitions = {
  insertProjectDB: async (user_id, category_id, name, budget) => {
    try {
      const result = await client.query(`  
            INSERT INTO projects (category_id,name,budget,user_id)
            VALUES (${category_id},'${name}',${budget},${user_id})
            RETURNING (id)  
      `);
      return result.rows[0].id;
    } catch (e) {
      console.log(e);
    }
  },
  getProject: async (project_id, user_id) => {
    try {
      const result = await client.query(`                   
        SELECT 
            projects.name,
            projects.budget,
            projects.cost,
            categories.name as category_name,
            categories.id as category_id
        FROM projects
        INNER JOIN users ON users.id = projects.user_id AND users.id = ${user_id}
        INNER JOIN categories ON categories.id = projects.category_id
        WHERE projects.id=${project_id} AND projects.delete_at IS NULL               
      `);
      return result.rows[0];
    } catch {
      (e) => {
        console.log(e);
      };
    }
  },
  getProjects: async (id) => {
    try {
      const result = await client.query(`
        SELECT * FROM projects
        WHERE user_id = ${id} AND delete_at IS NULL
      `);
      const rows = result.rows;
      return rows;
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  isOwnerOfProject: async (user_id, project_id) => {
    try {
      const result = await client.query(`      
        SELECT id 
        FROM projects
        WHERE projects.id = ${project_id} AND projects.user_id = ${user_id} 
        AND projects.delete_at IS NULL
      `);
      const rows = result.rows;
      if (rows.length === 1) {
        return true;
      } else {
        return false;
      }
    } catch {
      (e) => {
        console.log(e);
        return e;
      };
    }
  },
  deleteProject: async (project_id) => {
    try {
      const result = await client.query(`
            UPDATE projects
            SET delete_at = CURRENT_DATE
            WHERE id = ${project_id}
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
module.exports = projectRequisitions;
