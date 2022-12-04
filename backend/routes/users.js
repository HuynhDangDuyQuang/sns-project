const router = require("express").Router();
const User = require("../models/User");

//CRUD
//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("user info sucessfully updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can only update information of your own acount");
    }
});

//delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("user sucessfully deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can only delete your own acount");
    }
});

//get user
// router.get("/:id", async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         const { password, updatedAt, ...other } = user._doc;
//         return res.status(200).json(other);
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// });

//query user informationn
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
});

//user follow
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //confirm that you are not in the followers list already
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    }
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    }
                });
                return res.status(200).json("Follow successfully");
            } else {
                return res.status(403).json("you've already followed this account");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("can't follow yourself");
    }
});

//user unfollow
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //confirm that you are in the followers list
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    }
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    }
                });
                return res.status(200).json("Unfollow successfully");
            } else {
                return res.status(403).json("you can't unfollow this account");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("can't unfollow yourself");
    }
});


// router.get("/", (req,res) => {
//     res.send("user router");
// });

module.exports = router;