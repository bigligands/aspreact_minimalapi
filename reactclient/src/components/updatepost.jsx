import React from "react";

export default function UpdatePost(props) {
  function handleChange(event) {
    props.setPostToUpdate((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  return (
    <form
      className="update-post-form"
      onSubmit={(event) => {
        event.preventDefault();
        props.setCrud("updatepost");
        props.setUpdatingPost(false)
      }}
    >
      <label>title:</label>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
        value={props.postToUpdate.title}
      />

      <label>content:</label>
      <textarea
        type="text"
        placeholder="post content"
        onChange={handleChange}
        name="content"
        value={props.postToUpdate.content}
      />
      <button className="submit-button">update</button>
    </form>
  );
}
