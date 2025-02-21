const pool = require("./db.js");
/* const client = await pool.connect(); */

const Emprestimo = require("./emprestimo.model.js");

// constructor
const Livro = function (livro) {
    this.idlivro = livro.idlivro;
    this.nomelivro = livro.nomelivro;
};

Livro.create = async (newLivro, result) => {
    await pool.query("BEGIN");
    pool.query("INSERT INTO livro(nomelivro) VALUES ($1)", [newLivro.nomelivro], async (err, res) => {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            result(err, null);
            return;
        }
        console.log("created livro: ", {
            id: res.insertId, ...newLivro
        });
        await pool.query("COMMIT");
        result(null, { id: res.insertId, ...newLivro });
    });
};

Livro.findById = (id, result) => {
    console.log('findById id = ', id)
    pool.query('SELECT * FROM livro WHERE idlivro = $1', [id], (err,
        res) => {
        if (err) {
            //throw error
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("livro encontrado: ", res.rows[0]);
            result(null, res.rows[0]);
            return;
        }
        // not found livro with the id
        console.log("livro nao encontrado: res.length = ", res);
        result({ kind: "not_found" }, null);
    });
};

Livro.getAll = (nomelivro, result) => {
    let query = "SELECT * FROM livro";
    if (nomelivro) {
        query += " WHERE nomelivro LIKE '%${nomelivro}%'";
    }
    pool.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("livros: ", res.rows);
        result(null, res);
    });
};

Livro.updateById = async (id, livro, result) => {
    await pool.query("BEGIN");
    pool.query("UPDATE livro SET nomelivro = $1 WHERE idlivro = $2", [livro.nomelivro, id], async (err, res) => {
            if (err) {
                console.log("error: ", err);
                await pool.query("ROLLBACK");
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Livro with the id
                await pool.query("ROLLBACK");
                result({ kind: "not_found" }, null);
                return;
            }
            await pool.query("COMMIT");
             ;
            console.log("updated livro: ", { id: id, ...livro });
            result(null, { id: id, ...livro });
        }
    );
};
Livro.remove = async (id, result) => {
    Emprestimo.removeFromLivro(id);
    await pool.query("BEGIN");
    pool.query("DELETE FROM livro WHERE idlivro = $1", [id], async (err, res)=> {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Livro with the id
            await pool.query("ROLLBACK");
            result({ kind: "not_found" }, null);
            return;
        }
        await pool.query("COMMIT");
         ;
        console.log("deleted livro with idlivro: ", id);
        result(null, res);
    });
};

Livro.removeAll = async result => {
    await pool.query("COMMIT");
    pool.query("DELETE FROM livro", async (err, res) => {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            result(null, err);
            return;
        }
        await pool.query("COMMIT");
         ;
        console.log(`deleted ${res.affectedRows} livros`);
        result(null, res);
    });
};

module.exports = Livro