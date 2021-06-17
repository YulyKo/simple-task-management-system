const taskController = require('../controllers').task;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'API start here here',
  }));

  app.post('/api/tasks', taskController.create);
  app.get('/api/tasks', taskController.getAll);
  app.get('/api/tasks/:taskId', taskController.getById);
  app.put('/api/tasks/:taskId', taskController.update);
  app.delete('/api/tasks/:taskId', taskController.delete);
};
