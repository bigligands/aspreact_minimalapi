import React from "react";

export default function NavButton(props) {
    console.log(props)
  function handleLeftClick() {
    if (props.navCount.start !== 0) {
      props.setNavCount((prev) => ({
        start: prev.start - 5,
        end: prev.end - 5,
      }));
    }
  }
  function handleRightClick() {
    if (props.navCount.start + 5 < props.posts.length) {
      props.setNavCount((prev) => ({
        start: prev.start + 5,
        end: prev.end + 5 
      }));
    }
  }
  return (
    <div className="nav-buttons">
      <div onClick={handleLeftClick} className="left-arrow"></div>
      <div onClick={handleRightClick} className="right-arrow"></div>
    </div>
  );
}
