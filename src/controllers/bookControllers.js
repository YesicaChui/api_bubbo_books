const {db}=require('../firebase')

const bookControllers = {
  getBooks: async(req,res)=>{
    const querySnapshot = await db.collection('users').get()
    console.log(querySnapshot.docs[0].data())
    const users =[]

    querySnapshot.docs.map(doc=>{
      console.log(doc.id)
      console.log(doc.data())
      users.push({ id:doc.id, ...doc.data()})
    })
    res.json(users)
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