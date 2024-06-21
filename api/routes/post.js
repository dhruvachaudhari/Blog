import express from "express"
import { addpost, deletepost, getpost, getposts, updatepost, singlepost, getcomment, addcomment, editcomment, deletecomment, } from "../controllers/post.js"

const router = express.Router()


router.get("/post", getposts)
router.get("/blogs", getpost)
router.get("/post/:idpost", singlepost)
router.post("/write", addpost)
router.delete("/:id", deletepost)
router.put("/:id", updatepost)

//Comment
router.get("/post/:idpost/comments", getcomment)
router.post("/post/:idpost/comment", addcomment)
router.delete("/post/:idpost/comment/:id", deletecomment)
router.put("/post/:idpost/comment/:id", editcomment)
export default router