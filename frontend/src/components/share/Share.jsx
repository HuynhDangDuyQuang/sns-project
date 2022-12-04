import { Analytics, Face, Gif, Image } from '@mui/icons-material';
import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../state/AuthContext';
import "./Share.css";
import axios from "axios";

export default function Share() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();

    const [file, setFile] = useState(null);
    console.log(file);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;

            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }

        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={PUBLIC_FOLDER + (user.profilePicture || "/person/noAvatar.png")}
                        alt=""
                        className='shareProfileImg' />
                    <input
                        type="text"
                        className='shareInput'
                        placeholder="What 's on your mind?"
                        ref={desc}
                    />
                </div>
                <hr className='shareHr' />

                <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor='file'>
                            <Image className='shareIcon' htmlColor='blue' />
                            <span className="shareOptionText">Image</span>
                            <input
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{
                                    display: "none"
                                }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Gif className='shareIcon' htmlColor='hotpink' />
                            <span className="shareOptionText">GIF</span>
                        </div>
                        <div className="shareOption">
                            <Face className='shareIcon' htmlColor='green' />
                            <span className="shareOptionText">Emotion</span>
                        </div>
                        <div className="shareOption">
                            <Analytics className='shareIcon' htmlColor='red' />
                            <span className="shareOptionText">Vote</span>
                        </div>
                    </div>
                    <button
                        className='shareButton' type="submit">
                        Post
                    </button>
                </form>
            </div>
        </div>
    )
}
