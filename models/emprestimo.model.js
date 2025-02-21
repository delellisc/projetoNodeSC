const pool = require("./db.js");
/* const client = await pool.connect(); */

// constructor
const Emprestimo = function (emprestimo) {
    this.idaluno = emprestimo.idaluno;
    this.idlivro = emprestimo.idlivro;
};

Emprestimo.create = async (newEmprestimo, result) => {
    console.log(newEmprestimo);
    await pool.query("BEGIN");
    pool.query("INSERT INTO emprestimo(idaluno, idlivro, dataemprestimo) VALUES ($1, $2, CURRENT_TIMESTAMP)", [newEmprestimo.idaluno, newEmprestimo.idlivro], async (err, res) => {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            result(err, null);
            return;
        }
        console.log("created emprestimo: ", {
            id: res.insertId, ...newEmprestimo
        });
        await pool.query("COMMIT");
        result(null, { id: res.insertId, ...newEmprestimo });
    });
};

Emprestimo.findById = (id, result) => {
    console.log('findById id = ', id)
    pool.query(''+
        'SELECT e.idemprestimo, a.nome, l.nomelivro, e.dataemprestimo, e.datadevolucao FROM public.emprestimo e'+
        'INNER JOIN public.aluno a ON e.idaluno = a.idaluno'+
        'INNER JOIN public.livro l ON e.idlivro = l.idlivro'+
        'WHERE e.idemprestimo = $1', [id], (err,
        res) => {
        if (err) {
            //throw error
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("emprestimo encontrado: ", res.rows[0]);
            result(null, res.rows[0]);
            return;
        }
        // not found emprestimo with the id
        console.log("emprestimo nao encontrado: res.length = ", res);
        result({ kind: "not_found" }, null);
    });
};

Emprestimo.getAll = (nomeAluno, nomeLivro, result) => {
    let query = ''+
            'SELECT e.idemprestimo, a.nome, l.nomelivro, e.dataemprestimo, e.datadevolucao FROM public.emprestimo e'+
            ' INNER JOIN public.aluno a ON e.idaluno = a.idaluno'+
            ' INNER JOIN public.livro l ON e.idlivro = l.idlivro';
    if (nomeAluno && nomeLivro){
        query += ` WHERE a.nome LIKE '%${nomeAluno}%' AND l.nomelivro LIKE '%${nomeLivro}%'`;
    }
    else if (nomeAluno) {
        query += ` WHERE a.nome LIKE '%${nomeAluno}%'`;
    }
    else if (nomeLivro) {
        query += ` WHERE l.nomelivro LIKE '%${nomeLivro}%'`;
    }
    pool.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("emprestimos: ", res.rows);
        result(null, res);
    });
};

Emprestimo.updateDevolutionDate = async (id, emprestimo, result) => {
    await pool.query("BEGIN");
    pool.query("UPDATE emprestimo SET datadevolucao = CURRENT_TIMESTAMP WHERE idemprestimo = $1", [id], async (err, res) => {
            if (err) {
                console.log("error: ", err);
                await pool.query("ROLLBACK");
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Emprestimo with the id
                await pool.query("ROLLBACK");
                result({ kind: "not_found" }, null);
                return;
            }
            await pool.query("COMMIT");
            
            console.log("updated emprestimo: ", { id: id, ...emprestimo });
            result(null, { id: id, ...emprestimo });
        }
    );
};
Emprestimo.remove = async (id, /* result */) => {
    await pool.query("BEGIN");
    pool.query("DELETE FROM emprestimo WHERE idemprestimo = $1", [id], async (err, res)=> {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            /* result(null, err); */
            return;
        }
        if (res.affectedRows == 0) {
            // not found Emprestimo with the id
            await pool.query("ROLLBACK");
            /* result({ kind: "not_found" }, null); */
            return;
        }
        await pool.query("COMMIT");

        console.log("deleted emprestimo with idemprestimo: ", id);
        /* result(null, res); */
    });
};

Emprestimo.removeAll = async result => {
    await pool.query("COMMIT");
    pool.query("DELETE FROM emprestimo", async (err, res) => {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            result(null, err);
            return;
        }
        await pool.query("COMMIT");
        
        console.log(`deleted ${res.affectedRows} emprestimos`);
        result(null, res);
    });
};

Emprestimo.removeFromLivro = async idlivro => {
    await pool.query("BEGIN");
    pool.query("DELETE FROM emprestimo WHERE idlivro = $1", [idlivro], async (err, res)=> {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            return;
        }
        if (res.affectedRows == 0) {
            // not found Emprestimo with the idlivro
            await pool.query("ROLLBACK");
            return;
        }
        await pool.query("COMMIT");
        console.log("deleted emprestimo with idlivro: ", idlivro);
    });
};

Emprestimo.removeFromAluno = async idaluno => {
    await pool.query("BEGIN");
    pool.query("DELETE FROM emprestimo WHERE idaluno = $1", [idaluno], async (err, res)=> {
        if (err) {
            console.log("error: ", err);
            await pool.query("ROLLBACK");
            return;
        }
        if (res.affectedRows == 0) {
            // not found Emprestimo with the idaluno
            await pool.query("ROLLBACK");
            return;
        }
        await pool.query("COMMIT");

        console.log("deleted emprestimo with idaluno: ", idaluno);
    });
};

/* Emprestimo.findByAlunoId = (idaluno, result) => {
    console.log('findById id = ', idaluno)
    pool.query(''+
            'SELECT e.idemprestimo, a.nome, l.nomelivro, e.dataemprestimo, e.datadevolucao FROM public.emprestimo e'+
            ' INNER JOIN public.aluno a ON e.idaluno = a.idaluno'+
            ' INNER JOIN public.livro l ON e.idlivro = l.idlivro'+
            ' WHERE e.idaluno = idaluno', [idaluno], (err, res) => {
        if (err) {
            //throw error
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("emprestimo encontrado: ", res.rows);
            result(null, res.rows);
            return;
        }
        // not found emprestimo with the id
        console.log("emprestimo nao encontrado: res.length = ", res);
        result({ kind: "not_found" }, null);
    });
};

Emprestimo.findByLivroId = (idlivro, result) => {
    console.log('findById id = ', id)
    pool.query(''+
            'SELECT e.idemprestimo, a.nome, l.nomelivro, e.dataemprestimo, e.datadevolucao FROM public.emprestimo e'+
            ' INNER JOIN public.aluno a ON e.idaluno = a.idaluno'+
            ' INNER JOIN public.livro l ON e.idlivro = l.idlivro'+
            ' WHERE e.idlivro = idlivro', [idlivro], (err, res) => {
        if (err) {
            //throw error
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.rows.length) {
            console.log("emprestimos encontrados: ", res.rows);
            result(null, res.rows);
            return;
        }
        // not found emprestimo with the id
        console.log("emprestimo nao encontrado: res.length = ", res);
        result({ kind: "not_found" }, null);
    });
}; */

module.exports = Emprestimo