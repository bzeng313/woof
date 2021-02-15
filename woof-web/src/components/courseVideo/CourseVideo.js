import React from "react";
import ReactPlayer from "react-player";
import { useRef, useEffect } from "react";
import "./CourseVideo.css";

/**
 * This component houses the current video being displayed on
 * the web app.
 * @param props is an object with the properties
 *    url - a string that is the link to a youtube video
 *    updatePlayer - a react hook from the parent component, which
 *                    updates the parent's player handle
 */
function CourseVideo(props) {
  let player = useRef(null);
  useEffect(() => {
    props.updatePlayer(player);
  });
  return (
    <div className="CourseVideo">
      <ReactPlayer controls url={props.url} ref={player} />
    </div>
  );
}

export default CourseVideo;