const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create new post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//update post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("Successfully Edited! ");
        } else {
            return res.status(403).json("you can't update post of other account");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

//delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("Successfully Deleted! ");
        } else {
            return res.status(403).json("you can't delete post of other account");
        }
    } catch (err) {
        return res.status(403).json(err);
    }
});

//get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(403).json(err);
    }
});

// like/unlike post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //confirm that you are haven't liked the post already
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("Like post successfully");
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("Unlike post succesfully");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//get post for timeline
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        //yourself's post
        const userPosts = await Post.find({ userId: currentUser._id });
        //following account's post
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
});

//get post for profile
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        //yourself's post
        const posts = await Post.find({ userId: user._id });
        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json(err);
    }
});

module.exports = router;