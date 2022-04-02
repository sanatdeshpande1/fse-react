import React from "react";
import { useState } from "react";
import { findAllTuitsDislikedByUser } from "../../services/dislikes-service";
import { findAllTuitsLikedByUser } from "../../services/likes-service";

const TuitStats = ({ tuit, likeTuit = () => { }, dislikeTuit = () => { } }) => {
  // console.log(tuit);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  findAllTuitsLikedByUser("me").then(res => setIsLiked((res.filter(t => t._id === tuit._id)).length > 0));

  findAllTuitsDislikedByUser("me").then(res => setIsDisliked((res.filter(t => t._id === tuit._id)).length > 0));

    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          <span className="ttr-stats-replies">{tuit.stats && tuit.stats.replies}</span>
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          <span className="ttr-stats-retuits">{tuit.stats && tuit.stats.retuits}</span>
        </div>
        <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
              {
                isLiked &&
                  <i className="fa-solid fa-thumbs-up me-1" style={{color: 'red'}}></i>
              }
              {
                !isLiked &&
                  <i className="fa-solid fa-thumbs-up me-1"></i>
              }
            <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
          </span>
        </div>
        <div className="col">
          <span className="ttr-dislike-tuit-click" onClick={() => {dislikeTuit(tuit)}
          }>
              {
                isDisliked &&
                  <i className="fa-solid fa-thumbs-down me-1" style={{color: 'blue'}}></i>
              }
              {
                !isDisliked &&
                  <i className="fa-solid fa-thumbs-down me-1"></i>
            }
            
            <span className="ttr-stats-dislikes">{tuit.stats && tuit.stats.dislikes}</span>
          </span>
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;