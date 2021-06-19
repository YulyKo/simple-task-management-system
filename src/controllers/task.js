const db = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  create(req, res) {
    // next step => get all tasks by user access token
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

  getAll(req, res) {
    // next step => get all tasks by user access token
    return db.tasks
      .findAll()
      .then((tasks) => res.status(200).send(tasks))
      .catch((error) => res.status(400).send(error));
  },

  getById(req, res) {
    // next step => get all tasks by user access token
    return db.tasks
      .findAll({ where: {
        id: req.params.taskId,
      } })
      .then((task) => res.status(200).send(task))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return db.tasks
      .update(
        {
          title: req.body.title,
          description: req.body.description,
          priority: req.body.priority,
          dueDate: req.body.dueDate,
        },
        { where: { id: req.params.taskId } })
      .then((task) => res.status(200).send(task))
      .catch((error) => { res.status(400).send(error); });
  },

  delete(req, res) {
    return db.tasks
      .destroy( { where: { id: req.params.taskId } })
      .then((task) => res.status(200).send(task))
      .catch((error) => res.status(400).send(error));
  },
};
