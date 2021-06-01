
const {pool} = require('../config');

const getBooks = (request, response) => {
  pool.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addBook = (request, response) => {
  const {author, title} = request.body

  pool.query(
    'INSERT INTO tasks (author, title) VALUES ($1, $2)',
    [author, title],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({status: 'success', message: 'Taks added.'})
    },
  )
}

module.exports = {
  getBooks,
  addBook,
}
