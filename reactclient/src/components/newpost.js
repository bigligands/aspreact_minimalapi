import React from "react";

export default function NewPost(props) {
  function handleChange(event) {
    props.setPostData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  return (
    <form
      className="new-post-form"
      onSubmit={(event) => {
        event.preventDefault();
        props.submitPost();
        props.setCrud("newpost");
        props.setNewPost();
        props.setPostData({title:'', content:''})
      }}
    >
      <label>title:</label>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
        value={props.postData.title}
      />

      <label>content:</label>
      <textarea
        type="text"
        placeholder="post content"
        onChange={handleChange}
        name="content"
        value={props.postData.content}
      />
      <button className="submit-button">submit</button>
    </form>
  );
}
