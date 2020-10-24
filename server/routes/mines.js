const express = require('express');
const router = express.Router();

const Mine = require('../models/mine');
const User = require('../models/user');

const saveMine = ( mine, res ) => {
  mine
    .save()
    .then(mine => res.json(mine))
    .catch(() => res.status(400).json({msg: "Error: Could not save mine"}));

}

// get mines for a particular user
router.get("/", (req, res) => {
  Mine.find({author: req.username.username})
  .then(mines => {
    res.json(mines);
  }).catch(err => res.json({msg: "Could not find mines for that user"}));
})

// create new mine for a particular user
router.post("/", (req, res) => {
  const { title, body, bookmarkLink } = req.body;
  let mine = new Mine({
    title,
    body: JSON.parse(body),
    author: req.username.username,
    bookmarkLink
  });
  saveMine(mine,res);
})

// update a mine given an ID
router.put("/:id", (req, res) => {
  const { title, body, bookmarkLink } = req.body;
  mine.findById(req.params.id)
    .then(mine => {
      mine.title = title;
      mine.body = JSON.parse(body);
      mine.bookmarkLink = bookmarkLink
      saveMine(mine, res);
    }).catch(() => res.json({msg: "No mine found with that ID"}));
});

// Delete a mine
router.delete("/", (req, res) => {
  Mine
    .findByIdAndDelete(req.params.id)
    .then(() => res.json({msg: "Mine Deleted"}))
    .catch(() => res.json({msg: "Could not find mine to delete"}));
});

module.exports = router;