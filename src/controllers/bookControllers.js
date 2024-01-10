const bookControllers = {
  getBooks: (req, res) => {
   res.send("leyendo libros")
  },
  getBook: (req, res) => {
    res.send("leyendo libro")
  },
  createBook: (req, res) => {
   res.send("Insertando libro")

  },
  updateBook: (req, res) => {
    res.send("actualizando libro")
  },
  deleteBook: (req, res) => {
    res.send("borrando libro")
  },
}
module.exports = bookControllers