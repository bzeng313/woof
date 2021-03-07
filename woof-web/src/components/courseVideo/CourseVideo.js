import React from "react";
import ReactPlayer from "react-player";
import { useRef, useEffect, useContext } from "react";
import "./CourseVideo.css";
import LectureContext from "../../contexts/LectureContext";

/**
 * This component houses the current video being displayed on
 * the web app.
 * @param props is an object that contains any properties that
 * ReactPlayer might take (see react-player documentation) and
 * it also contains
 *    videoData - information about the video to be played
 *    updatePlayer - [optional] a react hook from the parent component,
 *                   which updates the parent's player handle
 *
 */
function CourseVideo(props) {
  const lectureApi = useContext(LectureContext);
  let player = useRef(null);
  useEffect(() => {
    if (lectureApi) {
      lectureApi.setCurrentRef(player);
    }
    if (props.updatePlayer) {
      props.updatePlayer(player);
    }
  });

  return (
    <div className="CourseVideo">
      <div
        onResize={() => console.log("hello")}
        className="player-wrapper"
        style={props.light ? {} : { position: "relative", paddingTop: "65vh" }}
      >
        <ReactPlayer
          className="react-player"
          style={
            props.light
              ? { margin: "auto" }
              : { position: "absolute", top: 0, left: 0 }
          }
          width={props.width ? props.width : "100%"}
          height={props.height ? props.height : "100%"}
          {...props}
          url={props.videoData.url}
          ref={player}
          // onProgress={(progress) => {
          //   videoProgressApi.setProgress(progress);
          // }}
        />
      </div>
    </div>
  );
}

export default CourseVideo;
