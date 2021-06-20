const taskController = require('../controllers').task;
const userController = require('../controllers').user;
const cors = require('cors');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'API start here here',
  }));

  app.post('/api/users/registration', cors(), userController.registration);

  app.post('/api/tasks', cors(), taskController.create);
  app.get('/api/tasks', taskController.getAll);
  app.get('/api/tasks/:taskId', taskController.getById);
  app.put('/api/tasks/:taskId', taskController.update);
  app.put('/api/tasks/changeover/:taskId', cors(), taskController.changeoverTask);
  app.delete('/api/tasks/:taskId', taskController.delete);
};
