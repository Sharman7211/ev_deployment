const express= require("express")
const postRouter=express.Router()
const  {PostModel}=require("../models/post.model")

const jwt= require("jsonwebtoken")

postRouter.post("/add",async(req,res)=>{
    try{
        const post= new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"A new post has been added"})
    }catch{
        res.status(400).send({"msg":err.message}) 
    }
})
// Update post endpoint
postRouter.put('/posts/:postId', async (req, res) => {
    try {
    // Check if post exists and belongs to user
    const post = await Post.findOne({ _id: req.params.postId, user: req.user._id });
    if (!post) {
    return res.status(404).json({ error: 'Post not found' });
    }
    // Update post
post.title = req.body.title;
post.body = req.body.body;
post.device = req.body.device;
post.no_of_comments = req.body.no_of_comments;
await post.save();

return res.status(200).json({ message: 'Post updated successfully' });
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
    }
    });
    // Delete post endpoint
    postRouter.delete('/posts/:postId', async (req, res) => {
        try {
        // Check if post exists and belongs to user
        const post = await Post.findOne({ _id: req.params.postId, user: req.user._id });
        if (!post) {
        return res.status(404).json({ error: 'Post not found' });
        }
        // Delete post
    await post.delete();
    
    return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
    }
    });
    


module.exports={
    postRouter
}