import React from "react";

export default function Post(props) {
  function handleDelete() {
    props.setPostToDelete(() => {
      return props.id;
    });
    props.setCrud("delete");
  }
  function handleUpdate() {
    props.setPostIdToUpdate(props.id);
    props.setUpdatingPost(prev => !prev);
  }
  return (
    <div className="post">
      <h4>{props.id}</h4>
      <h4>{props.title}</h4>
      <p>{props.content}</p>
      <button
        className="update-button"
        onClick={handleUpdate}
      >
        update
      </button>
      <button className="delete-button" onClick={handleDelete}>
        delete
      </button>
    </div>
  );
}
