const Aluno = require("../models/aluno.model.js");

// Create and Save a new Aluno
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    // Create a Aluno
    const aluno = new Aluno({
        nome: req.body.nome || false
    });
    
    // Save Aluno in the database
    Aluno.create(aluno, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Aluno."});
        else res.send(data);
    });
};

// Retrieve all Alunos from the database (with condition).
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    Aluno.getAll(nome, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving alunos."
});
        else res.send(data);
    });
};

// Find a single Aluno by Id
exports.findOne = (req, res) => {
    Aluno.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Aluno nao encontrado com id ${ req.params.id }."
});
} else {
    res.status(500).send({
        message: "Erro buscando Aluno com id " +
            req.params.id
    });
}
} else
res.send(data);
});
};

// Update a Aluno identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    
    Aluno.updateById(
        req.params.id,
        new Aluno(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Aluno with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Aluno with id " +
                            req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Aluno with the specified id in the request
exports.delete = (req, res) => {
    Aluno.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Aluno with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Aluno with id " + req.params.id
                });
            }
        } else res.send({
            message: `Aluno was deleted successfully!`
        });
    });
};

// Delete all Alunos from the database.
exports.deleteAll = (req, res) => {
    Aluno.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all alunos."
                });
        else res.send({
            message: `All Alunos were deleted successfully!` });
    });
}