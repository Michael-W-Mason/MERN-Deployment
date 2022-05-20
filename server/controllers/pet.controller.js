const Pet = require("../models/pet.model");

module.exports.findAllPet = (req, res) => {
    Pet.find().sort('type')
        .then(allPet => res.json({ Pet: allPet }))
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.addAPet = (req, res) => {
    Pet.exists({ name: req.body.name })
        .then(petExists => {
            if (petExists) {
                return Promise.reject(`Name already exists`);
            }
            return Pet.create(req.body)
        })
        .then(newPet => {
            res.json({ Pet: newPet })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.findOnePet = (req, res) => {
    Pet.findOne({ _id: req.params.id })
        .then(onePet => {
            res.json({ Pet: onePet })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.editOnePet = (req, res) => {
    Pet.exists({ name: req.body.name })
        .then(petExists => {
            if (petExists) {
                return Promise.reject(`Name already exists`);
            }
            return Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        })
        .then(editPet => {
            res.json({ Pet: editPet })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}

module.exports.deleteOnePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then(deletedPet => {
            res.json({ Pet: deletedPet })
        })
        .catch(err => res.json({ msg: "An Error Occured", error: err }));
}