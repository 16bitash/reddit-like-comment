const commentWrapper = document.querySelector(".comment-wrapper");
const commentInput = document.querySelector(".comment-input");
const addButton = document.querySelector(".add-button");

const comments = [
  //   { id: 1, text: "This is a comment", likes: 0, replies: [] },
];

const createCommentObject = (commentText) => {
  return {
    id: Math.random(),
    text: commentText,
    likes: 0,
    replies: [],
  };
};

const createCommentNode = (comment) => {
  const commentNode = document.createElement("div");
  commentNode.classList.add("comment", "hide-reply");

  const commentText = document.createElement("div");
  commentText.classList.add("comment-text");
  commentText.innerText = comment.text;

  const buttonsAndLikesWrapper = document.createElement("div");
  buttonsAndLikesWrapper.classList.add("button-and-likes-wrapper");

  const replyButton = document.createElement("button");
  replyButton.classList.add("button", "success");
  replyButton.innerText = "Reply";
  replyButton.onclick = () => commentNode.classList.toggle("hide-reply");

  const likeButton = document.createElement("button");
  likeButton.classList.add("button", "success");
  likeButton.innerText = "Like";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button", "delete");
  deleteButton.innerText = "Delete";

  const likeText = document.createElement("div");
  likeText.innerText = `${comment.likes} likes`;
  likeText.classList.add("likes-text");

  const replyWrapper = document.createElement("div");
  replyWrapper.classList.add("reply-wrapper");

  const replyInput = document.createElement("input");

  const addReplyButton = document.createElement("button");
  addReplyButton.classList.add("button", "success");
  addReplyButton.innerText = "Add";
  addReplyButton.onclick = () => {
    const replyText = replyInput.value;
    const commentId = comment.id;

    const newReplyObject = createCommentObject(replyText);

    const commentObj = comments.find(
      (commentObject) => commentObject.id === commentId
    );

    commentObj.replies.push(newReplyObject);

    renderComments();
  };

  const cancelReplyButton = document.createElement("button");
  cancelReplyButton.classList.add("button", "delete");
  cancelReplyButton.innerText = "Cancel";
  cancelReplyButton.onclick = () => commentNode.classList.add("hide-reply");

  const replyCommentsDomArray = comment.replies.map((reply) => {
    return createCommentNode(reply);
  });

  commentNode.appendChild(commentText);
  commentNode.appendChild(buttonsAndLikesWrapper);
  commentNode.appendChild(replyWrapper);

  buttonsAndLikesWrapper.appendChild(replyButton);
  buttonsAndLikesWrapper.appendChild(likeButton);
  buttonsAndLikesWrapper.appendChild(deleteButton);
  buttonsAndLikesWrapper.appendChild(likeText);

  replyWrapper.appendChild(replyInput);
  replyWrapper.appendChild(addReplyButton);
  replyWrapper.appendChild(cancelReplyButton);

  replyCommentsDomArray.forEach((replyDom) => {
    commentNode.appendChild(replyDom);
  });

  return commentNode;
};

const renderComments = () => {
  console.log(comments);
  commentWrapper.innerText = "";

  comments.forEach((comment) => {
    const commentNode = createCommentNode(comment);

    commentWrapper.appendChild(commentNode);
  });
};

const addComment = () => {
  const commentText = commentInput.value;

  if (commentText === "") {
    alert("Please enter a comment");
    return;
  }

  const newComment = createCommentObject(commentText);

  comments.push(newComment);
  commentInput.value = "";

  renderComments();
};

addButton.addEventListener("click", addComment);
