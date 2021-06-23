const { verifyToken } = require('../midlewhere/authJWT');
const taskController = require('../controllers').task;
const userController = require('../controllers').user;

module.exports = (app) => {
  app.get('/api', function(req, res) {
    res
      .header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
      )
      .status(200)
      .send({
        message: 'API start here here',
      });
  });

  // auth user
  app.post(
    '/api/auth/registration',
    userController.registration
  );
  app.post(
    '/api/auth/confirm/:code',
    [verifyToken],
    userController.confirmUser
  );

  app.get(
    '/api/auth/login',
    userController.login
  );

  app.get(
    '/api/auth/token/:email',
    userController.refresh
  );

  // crud task
  app.post(
    '/api/tasks',
    [verifyToken],
    taskController.create
  );

  app.get(
    '/api/tasks',
    [verifyToken],
    taskController.getAll
  );

  app.get(
    '/api/tasks/:taskId',
    [verifyToken],
    taskController.getById
  );

  app.put(
    '/api/tasks/:taskId',
    [verifyToken],
    taskController.update
  );

  app.put(
    '/api/tasks/changeover/:taskId',
    [verifyToken],
    taskController.changeoverTask);

  app.delete(
    '/api/tasks/:taskId',
    [verifyToken],
    taskController.delete
  );
};
