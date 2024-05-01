const express = require("express")
const router = express.Router()

router.get("/", (req, res) =>{
    res.send("YOUR GET REQUEST")
})

router.get("/name", (req, res) =>{
    res.send("Hey there "+ req.query.name)
})

router.get("/:id", (req, res) =>{
    res.send("YOUR GET REQUEST with id "+ req.params.id)
})


module.exports = router