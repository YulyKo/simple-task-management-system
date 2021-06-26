const db = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

function getOwnerEmail(req) {
  return req.headers['owner'];
}

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
        owner: req.body.ownerEmail,
      })
      .then((task) => res.status(201).send(task))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getAll(req, res) {
    return db.tasks
      .findAll({ where: { owner: getOwnerEmail(req) } })
      .then((tasks) => res.status(200).send(tasks))
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
        { where: {
          id: req.params.taskId,
          owner: getOwnerEmail(req),
        },
        returning: true,
        plain: true,
        })
      .then((returned) => res.status(200).send(returned[1]))
      .catch((error) => { res.status(400).send(error); });
  },

  delete(req, res) {
    return db.tasks
      .destroy({
        where: {
          id: req.params.taskId,
          owner: getOwnerEmail(req),
        }
      })
      .then(() => res.status(200).send())
      .catch((error) => res.status(400).send(error));
  },

  changeoverTask(req, res) {
    return db.tasks
      .update({
          isDone: req.body.status,
        },
        { where: {
          id: req.params.taskId,
          owner: getOwnerEmail(req)
        },
        returning: true,
      })
      .then((returning) => res.status(200).send(returning[1][0]))
      .catch((error) => { res.status(400).send(error); });
  },

  changeoverTasks(req, res) {
    // it must to work, but return 200 at Postmen and 500 by client request
    // message: TypeError: Class constructor Sequelize cannot be invoked without 'new'
    return db.tasks
      .update({
          isDone: req.body.status,
        },
        { where: { owner: getOwnerEmail(req) }
      })
      .then((returning) => res.status(200).send(returning))
      .catch((error) => { res.status(400).send(error); });
  },


};
