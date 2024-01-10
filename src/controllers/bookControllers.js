const { db } = require('../firebase')
const bookCollection = db.collection('books')
const bookControllers = {
  getBooks: async (req, res) => {
    const querySnapshot = await bookCollection.get()
    console.log(querySnapshot.docs[0].data())
    const users = []

    querySnapshot.docs.map(doc => {
      console.log(doc.id)
      console.log(doc.data())
      users.push({ id: doc.id, ...doc.data() })
    })
    res.json(users)
  },
  getBook: async(req, res) => {
    const id = req.params.id
    const bookDoc = await bookCollection.doc(id).get()
    if(!bookDoc.exists){
      res.status(404).json({mensaje:"Libro no Encontrado"})
      return
    }
    res.json({id:bookDoc.id,...bookDoc.data()})
  
  },
  createBook: async (req, res) => {
    const book = req.body

    const docRef = await bookCollection.add(book)
    const newBook = await docRef.get()
    console.log(newBook.id)
    res.json({id:newBook.id,...newBook.data()})


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