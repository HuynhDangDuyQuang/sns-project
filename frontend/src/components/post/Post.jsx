import { ForkLeft, MoreVert } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import "./Post.css";
// import { Users } from "../../dummyData";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';

export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    // const [likeIconStyle, setLikeIconStyle] = useState('contrast(0%)');
    const { user: currentUser } = useContext(AuthContext);

    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?userId=${post.userId}`);
            console.log(response);
            setUser(response.data);
        };
        fetchUser();
    }, [post.userId]);

    const handleLike = async () => {
        try {
            //call like API
            await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
        } catch (err) {
            console.log(err);
        }

        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
        // setLikeIconStyle(isLiked ? 'contrast(0%)' : 'contrast(100%)');
    }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img
                                src={PUBLIC_FOLDER + (user.profilePicture || "/person/noAvatar.png")}
                                alt=""
                                className='postProfileImg' />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={PUBLIC_FOLDER + post.img} alt="" className='postImg' />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                            src={PUBLIC_FOLDER + "/heart.png"}
                            alt=""
                            className='likeIcon'
                            // style={{
                            //     filter: likeIconStyle
                            // }}
                            onClick={() =>
                                handleLike()} />
                        <span className="postLikeCounter">
                            {like} people liked this
                        </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
