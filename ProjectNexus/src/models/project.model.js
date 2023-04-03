const db = require("../utils/database");

module.exports = class Project {
    constructor(Project){
        this.project_name = Project.project_name;
        this.start_date = Project.start_date;
        this.end_date = Project.end_date;
    }
    // Method for saving project into database
    save() {
        let query = `INSERT INTO project (project_name, start_date, end_date) VALUES(?, ?, ?)`;
        return db.execute(query, [this.project_name, this.start_date, this.end_date]);
    }
    // Method to fetch by id and use information
    static fetch(id_project) {
        let query = `SELECT * FROM project `;
        if(id_project != 0) {
            query += `WHERE id = 0`;
            return db.execute(query, [id_project]);
        }
    }
    static fetch_name(name) {
        let query = `SELECT * FROM project `;
        if(name != "") {
            query += `WHERE project_name = ?`;
            return db.execute(query, [name]);
        }
    }
    static fetch_all() {
        return db.execute(`SELECT * FROM project`);
    }

    static fetch_all_id_name() {
        return db.execute(`SELECT id_project, project_name FROM project`);
    }
    
    static async update_epics(id, list_epics) {
        let query = `UPDATE epic SET id_project = ? WHERE epic_link = ?`;
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            list_epics.forEach(async(epic_link, index)=> {
                await connection.query(query, [id, epic_link]);
            });
            await connection.commit();
        } catch(error) {
            await connection.rollback();
            console.log(error);
        }
    }
}