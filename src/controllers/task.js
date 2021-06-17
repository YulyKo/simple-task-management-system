const db = require('../models/index');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  create(req, res) {
    return db.tasks
      .create({
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        isDone: false,
      })
      .then((taks) => res.status(201).send(taks.id))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  // getAll(req, res) {},

  // getById(req, res) {},

  // update(req, res) {},

  // delete(req, res) {},
};
