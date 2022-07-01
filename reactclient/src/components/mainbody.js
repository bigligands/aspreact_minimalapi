import React from "react";
import TableTitle from "./tabletitle";
import NavButton from "./navbuttons";
import NewPost from "./newpost";
import UpdatePost from "./updatepost";

export default function Mainbody(props) {
  return (
    <main className="mainbody-main">
      <h1>POSTS</h1>
      <TableTitle />
      {props.posts.slice(props.navCount.start, props.navCount.end)}
      {props.newPost === true && (
        <NewPost
          postData={props.postData}
          submitPost={props.submitPost}
          setPostData={props.setPostData}
          setCrud={props.setCrud}
          newPost={props.newPost}
          setNewPost={props.setNewPost}
        />
      )}
      {props.updatingPost === true && (
        <UpdatePost
          getPostById={props.getPostById}
          updatePost={props.updatePost}
          setCrud={props.setCrud}
          setPostData={props.setPostData}
          postToUpdate={props.postToUpdate}
          setPostToUpdate={props.setPostToUpdate}
          setUpdatingPost={props.setUpdatingPost}
        />
      )}
      <button className="new-post" onClick={props.setNewPost}>
        {props.newPost ? "cancel" : "new post"}
      </button>
      <NavButton setNavCount={props.setNavCount} navCount={props.navCount} posts={props.posts} />
      <h4 className="nav-count">{`showing posts ${props.navCount.start}:${props.navCount.end} (${props.posts.length})`}</h4>
    </main>
  );
}
