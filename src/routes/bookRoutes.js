const express = require("express")
const router = express.Router()
const bookControllers = require("../controllers/bookControllers")

const {db}=require('../firebase')


// router.get("/",bookControllers.getBooks)
router.get("/",async(req,res)=>{
  const querySnapshot = await db.collection('users').get()
  console.log(querySnapshot.docs[0].data())
  res.send("holaaaaaa firebase")
})
router.get("/:id",bookControllers.getBook)
router.post("/",bookControllers.createBook)
router.put("/:id",bookControllers.updateBook)
router.delete("/:id",bookControllers.deleteBook)



module.exports = router