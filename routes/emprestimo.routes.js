module.exports = app => {
    const emprestimos = require("../controllers/emprestimo.controller.js");
    
    var router = require("express").Router();
    
    // Create a new Emprestimo
    router.post("/", emprestimos.create);
    
    // Retrieve all Emprestimos
    router.get("/", emprestimos.findAll);
    
    // Update a Emprestimo with id
    router.put("/:id", emprestimos.update);

    // Delete a Emprestimo with id
    router.delete("/:id", emprestimos.delete);
    
    // Delete all Emprestimos
    router.delete("/", emprestimos.deleteAll);
    /*     
    // Retrieve a single Emprestimo with id
    router.get("/:id", emprestimos.findOne);
    */
    
    app.use('/api/emprestimos', router);
};