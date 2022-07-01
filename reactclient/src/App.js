import React from "react";

import Navigator from "./components/navbar";
import Mainbody from "./components/mainbody";
import Post from "./components/post";

export default function App() {
  const [posts, setPosts] = React.useState([]);
  const [postElements, setPostElements] = React.useState([]);
  const [navCount, setNavCount] = React.useState({start:0, end: 5});
  const [crud, setCrud] = React.useState("none");
  const [postData, setPostData] = React.useState({ title: "", content: "" });
  const [postToDelete, setPostToDelete] = React.useState(-1);
  const [postIdToUpdate, setPostIdToUpdate] = React.useState(-1);
  const [postToUpdate, setPostToUpdate] = React.useState({id:0, title:'', content:''});
  const [newPost, setNewPost] = React.useState(false);
  const [updatingPost, setUpdatingPost] = React.useState(false);

  function submitPost() {
    fetch("https://localhost:7080/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setCrud("completed");
      })
      .catch((error) => {
        console.error("error:", error);
      });
  }
  function getPosts() {
    const url = "https://localhost:7080/get-all-posts";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsFromServer) => {
        setPosts(postsFromServer);
        setCrud("completed");
      });
  }
  function deletePost() {
    const url = `https://localhost:7080/delete-post-by-id/${postToDelete}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setCrud("completed");
      })
      .catch((error) => console.log("Error", error));
  }
  function getPostById() {
    const url = `https://localhost:7080/get-posts-by-id/${postIdToUpdate}`;
    if(postIdToUpdate !== -1){
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setPostToUpdate(responseData);
        })
        .catch((error) => console.log("Error", error));
    }    
  }
  function updatePost() {
    const url = "https://localhost:7080/update-post";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToUpdate),
    })
      .then((response) => response.json())
      .then((responseData) => {
        //setPostIdToUpdate(-1);
        console.log(responseData);
        getPosts();
      });
  }

  React.useEffect(() => {
    console.log("crud changed");
    if (crud === "delete") {
      deletePost();
    }
    if (crud === "completed") {
      console.log("getting posts")
      getPosts();
    }
    if (crud === "updatepost"){
      console.log("updatin post")
      updatePost()
    }
  }, [crud]);

  React.useEffect(() => {
    getPostById()
    console.log("post to update has changed")
  }, [postIdToUpdate])

  React.useEffect(() => getPosts(), []);

  React.useEffect(() => {
    setPostElements(
      posts.map((post, index) => {
        return (
          <Post
            key={index}
            id={post.postId}
            title={post.title}
            content={post.content}
            deletePost={deletePost}
            setPostToDelete={setPostToDelete}
            setCrud={setCrud}
            postToDelete={postToDelete}
            setPostIdToUpdate={setPostIdToUpdate}
            updatingPost={updatingPost}
            setUpdatingPost={setUpdatingPost}
          />
        );
      })
    );
  }, [posts]);

  return (
    <div>
      <Navigator />
      <Mainbody
        posts={postElements}
        setPostData={setPostData}
        submitPost={submitPost}
        postData={postData}
        setCrud={setCrud}
        newPost={newPost}
        setNewPost={() => {
          setNewPost((prev) => !prev);
        }}
        postToUpdate={postToUpdate}
        setPostToUpdate={setPostToUpdate}
        updatingPost={updatingPost}
        setUpdatingPost={setUpdatingPost}
        updatePost={updatePost}
        setNavCount={setNavCount}
        navCount={navCount}
      />
    </div>
  );
}
