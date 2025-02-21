const Emprestimo = require("../models/emprestimo.model.js");

// Create and Save a new Emprestimo
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Emprestimo
    const emprestimo = new Emprestimo({
        idaluno: req.body.idaluno || false,
        idlivro: req.body.idlivro || false
    });
    // Save Emprestimo in the database
    Emprestimo.create(emprestimo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Emprestimo."
            });
        else res.send(data);
    });
};

// Retrieve all Emprestimos from the database (with condition).
exports.findAll = (req, res) => {
    const nomeAluno = req.body.nomeAluno;
    const nomeLivro = req.body.nomeLivro;
    Emprestimo.getAll(nomeAluno, nomeLivro, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving emprestimos."
            });
        else res.send(data);
    });
};

/* findByAlunoId */
/* findByLivroId */

// Find a single Emprestimo by Id
exports.findOne = (req, res) => {
    Emprestimo.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Emprestimo nao encontrado com id ${ req.params.id }"
                });
            } else {
                res.status(500).send({
                    message: "Erro buscando Emprestimo com id " + req.params.id
                });
            }
        } else
            res.send(data);
    });
};

// Update a Emprestimo identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);

    Emprestimo.updateDevolutionDate(
        req.params.id,
        new Emprestimo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Emprestimo with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Emprestimo with id " +
                            req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Emprestimo with the specified id in the request
exports.delete = (req, res) => {
    Emprestimo.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Emprestimo with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Emprestimo with id " + req.params.id
                });
            }
        } else res.send({
            message: `Emprestimo was deleted successfully!`
        });
    });
};

// Delete all Emprestimos from the database.
exports.deleteAll = (req, res) => {
    Emprestimo.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all emprestimos."
            });
        else res.send({
            message: `All Emprestimos were deleted successfully!`
        });
    });
}