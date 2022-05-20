const petController = require("../controllers/pet.controller");

module.exports = app => {
    app.get("/api/pet", petController.findAllPet);
    app.post("/api/pet", petController.addAPet);
    app.get("/api/pet/:id", petController.findOnePet);
    app.put("/api/pet/:id", petController.editOnePet);
    app.delete("/api/pet/:id", petController.deleteOnePet);
}