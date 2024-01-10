const { db } = require('../firebase')
const { merge } = require('../routes/bookRoutes')
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
  getBook: async (req, res) => {
    const id = req.params.id
    const bookDoc = await bookCollection.doc(id).get()
    if (!bookDoc.exists) {
      res.status(404).json({ mensaje: "Libro no Encontrado" })
      return
    }
    res.json({ id: bookDoc.id, ...bookDoc.data() })

  },
  createBook: async (req, res) => {
    const book = req.body

    const docRef = await bookCollection.add(book)
    const newBook = await docRef.get()
    console.log(newBook.id)
    res.json({ id: newBook.id, ...newBook.data() })


  },
  updateBook: async (req, res) => {
    const id = req.params.id
    const { title, author, year } = req.body
    const bookDoc = await bookCollection.doc(id).get()
    if (!bookDoc.exists) {
      res.status(404).json({ mensaje: "Libro no Encontrado" })
      return
    }
    const updateData={}
    if(title!=undefined) updateData.title=title
    if(author!=undefined) updateData.author=author
    if(year!=undefined) updateData.year=year

    await bookCollection.doc(id).update(updateData)

    res.json({ mensaje: "Libro Actualizado" })

  },
  deleteBook: async(req, res) => {
    const id = req.params.id
    const bookDoc = await bookCollection.doc(id).get()
    if (!bookDoc.exists) {
      res.status(404).json({ mensaje: "Libro no Encontrado" })
      return
    }
    await bookCollection.doc(id).delete()
    res.json({mensaje:"Libro Eliminado"})
  },
}
module.exports = bookControllers