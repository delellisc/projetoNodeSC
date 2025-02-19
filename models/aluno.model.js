const pool = require("./db.js");

// constructor
const Aluno = function (aluno) {
    this.idaluno = aluno.idaluno;
    this.nome = aluno.nome;
};

Aluno.create = (newAluno, result) => {
    pool.query("INSERT INTO aluno(nome) VALUES ($1)", [newAluno.nome], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created aluno: ", {
            id: res.insertId, ...newAluno
        });
        result(null, { id: res.insertId, ...newAluno });
    });
};

Aluno.findById = (id, result) => {
    console.log('findById id = ', id)
    pool.query('SELECT * FROM aluno WHERE idaluno = $1', [id], (err,
        res) => {
        if (err) {
            //throw error
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("aluno encontrado: ", res.rows[0]);
            result(null, res.rows[0]);
            return;
        }
        // not found aluno with the id
        console.log("aluno nao encontrado: res.length = ", res);
        result({ kind: "not_found" }, null);
    });
};

Aluno.getAll = (nome, result) => {
    let query = "SELECT * FROM aluno";
    if (nome) {
        query += " WHERE nome LIKE '%${nome}%'";
    }
    pool.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("alunos: ", res.rows);
        result(null, res);
    });
};

Aluno.updateById = (id, aluno, result) => {
    pool.query("UPDATE aluno SET nome = $1 WHERE idaluno = $2",
        [aluno.nome, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Aluno with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated aluno: ", { id: id, ...aluno });
            result(null, { id: id, ...aluno });
        }
    );
};
Aluno.remove = (id, result) => {
    pool.query("DELETE FROM aluno WHERE idaluno = $1", [id], (err, res)=> {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Aluno with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted aluno with idaluno: ", id);
        result(null, res);
    });
};

Aluno.removeAll = result => {
    pool.query("DELETE FROM aluno", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} alunos`);
        result(null, res);
    });
};

module.exports = Aluno