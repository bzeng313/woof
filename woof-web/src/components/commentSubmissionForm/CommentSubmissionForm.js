import React from "react";
import "./CommentSubmissionForm.css";

/**
 * The handler that's called when a user submits a comment.
 * Makes a call to the Firebase API and posts a comment to
 * Firestore database.
 *
 * This function made async because we desire to await for
 * the comment to be added to the database first and then
 * proceed with any rerendering.
 *
 * @param event is the event that is triggered upon hitting
 *            the "comment at" button
 * @param firebase is a handle on the Firebase API
 */
async function submitComment(event, videoId, firebase) {
  event.preventDefault();

  const firestore = firebase.firestore();
  const commentsRef = firestore
    .collection("videos")
    .doc(videoId)
    .collection("comments");

  let comment = event.target[0].value;

  await commentsRef.add({
    text: comment,
    username: "sam",
  });

  event.target[0].value = "";
  event.target[2].value = "";
}

/**
 * Converts seconds into the format "HH:MM:SS" and returns it.
 * @param seconds
 */
function convertSecondsToTimestamp(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

/**
 * This component contains the comment submission form and the logic needed
 * to submit a comment to Firebase.
 *
 * @param props is an object that has the properties
 *    firebase - a reference to the firebase API
 *    videoId - the videoId of the current YouTube video
 *    seconds - the current number of seconds the video being played is at
 */
function CommentSubmissionForm(props) {
  return (
    <div className="CommentSubmissionForm">
      <form
        className="comment-submission-form"
        noValidate
        autoComplete="off"
        onSubmit={(event) =>
          submitComment(event, props.videoId, props.firebase)
        }
      >
        <input className="comment-field" placeholder="write a comment..." />
        <input
          className="post-comment-button"
          type="submit"
          value="comment at"
        />
        <input
          className="timestamp-field"
          placeholder={convertSecondsToTimestamp(parseInt(props.seconds))}
        />
      </form>
    </div>
  );
}

export default CommentSubmissionForm;
