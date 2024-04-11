const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");

router.get("/", postController.getAll);
router.get("/:id", postController.getById);
router.post("/", postController.post);
router.put("/:id", postController.put);
router.delete("/:id", postController.delete);

module.exports = router;
