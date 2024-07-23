import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;
    let supplierStatus = 0;

    if (comment.status === "approved") {
      supplierStatus ++  
      content = comment.content;
    }

    if (comment.status === "pending") {
      content = "This part cannot be used in production line";
    }

    if (comment.status === "rejected") {
        supplierStatus --
      content = "This part should be returned to the supplier";
    }

    return <li key={comment.id}>{content} {supplierStatus}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
