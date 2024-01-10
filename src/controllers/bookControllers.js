const bookModel = require("../models/bookModel")

const bookControllers = {
  getBooks: (req, res) => {
    bookModel.find()
      .then(data => {
        res.json(data)
      })
      .catch(error => {
        res.json({ mensaje: error })
      })
  },
  getBook: (req, res) => {
    const id = req.params.id
    bookModel.findById(id)
      .then(data => {
        res.json(data)
      })
      .catch(error => {
        res.json({ mensaje: error })
      })
  },
  createBook: (req, res) => {
    const book = bookModel(req.body)
    book.save()
      .then((data) => {
        res.json(data)
      })
      .catch(error => {
        res.json({ mensaje: error })
      })

  },
  updateBook: (req, res) => {
    const id = req.params.id
    const { title, author, year } = req.body
    bookModel.updateOne({ _id: id }, { $set: { title, author, year } })
      .then((data) => {
        res.json(data)
      })
      .catch(error => {
        res.json({ mensaje: error })
      })
  },
  deleteBook: (req, res) => {
    const id = req.params.id
    bookModel.deleteOne({ _id: id })
      .then((data) => {
        res.json(data)
      })
      .catch(error => {
        res.json({ mensaje: error })
      })
  },
}
module.exports = bookControllers