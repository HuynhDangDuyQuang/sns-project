import React from 'react'
import "./Rightbar.css"
import { Users } from "../../dummyData"
import Online from '../online/Online'

export default function Rightbar({ user }) {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <>
        <div className="eventContainer">
          <img src={PUBLIC_FOLDER + "/star.png"} alt="" className='starImg' />
          <span className="eventText">
            Event for <b>followers only</b>
          </span>
        </div>
        <img src={PUBLIC_FOLDER + "/event.jpeg"} alt="" className='eventImg' />
        <h4 className='rightbarTitle'>Online Friend</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online user={user} key={user.id} />
          ))}
        </ul>
        <p className="promotionTitle">Promotion advertisement</p>
        <img
          src={PUBLIC_FOLDER + "/promotion/promotion1.jpeg"}
          alt=""
          className="rightbarPromotionImg" />
        <p className='promotionName'>Shopping</p>
        <img
          src={PUBLIC_FOLDER + "/promotion/promotion2.jpeg"}
          alt=""
          className="rightbarPromotionImg" />
        <p className='promotionName'>Car Shop</p>
        <img
          src={PUBLIC_FOLDER + "/promotion/promotion3.jpeg"}
          alt=""
          className="rightbarPromotionImg" />
        <p className='promotionName'>Quang Company</p>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Origin:</span>
            <span className="rightbarInfoKey">Viet Nam</span>
          </div>
          <h4 className="rightbarTilte">Friends</h4>
          <div className="rightbarFollowings">
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/1.jpeg"}
                alt=""
                className='rightbarFollowingImg' />
              <span className="rightbarFollowingName">Quang code</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/2.jpeg"}
                alt=""
                className='rightbarFollowingImg' />
              <span className="rightbarFollowingName">Quang code 2</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/3.jpeg"}
                alt=""
                className='rightbarFollowingImg' />
              <span className="rightbarFollowingName">Quang code 3</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/4.jpeg"}
                alt=""
                className='rightbarFollowingImg' />
              <span className="rightbarFollowingName">Quang code 4</span>
            </div>
            <div className="rightbarFollowing">
              <img
                src={PUBLIC_FOLDER + "/person/5.jpeg"}
                alt=""
                className='rightbarFollowingImg' />
              <span className="rightbarFollowingName">Quang code 5</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
