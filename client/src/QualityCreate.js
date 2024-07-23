import React, { useState } from "react";
import axios from "axios";

const QualityCreate = ({ partId }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(rating)
    await axios.post(`http://localhost:4001/parts/${partId}/quality`, {
      content, rating
    });
    
    console.log(content,rating,"added")
    setContent("");
    setRating("")
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Quality Report</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
          <label>Rate Part</label>
         
          <input value={rating} onChange={e => setRating(e.target.value)} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default QualityCreate;
