module.exports = app => {
    const livros = require("../controllers/livro.controller.js");
    
    var router = require("express").Router();
    
    // Create a new Livro
    router.post("/", livros.create);
    
    // Retrieve all Livros
    router.get("/", livros.findAll);
    
    // Retrieve a single Livro with id
    router.get("/:id", livros.findOne);
    
    // Update a Livro with id
    router.put("/:id", livros.update);
    
    // Delete a Livro with id
    router.delete("/:id", livros.delete);
    
    // Delete all Livros
    router.delete("/", livros.deleteAll);
    
    app.use('/api/livros', router);
};