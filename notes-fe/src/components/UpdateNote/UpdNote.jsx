// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./UpdNote.css"; // Import the CSS file
import axios from "axios";
import { useParams } from "react-router-dom";
import useHistory from "/src/useHistory";
import { useNavigate } from "react-router-dom";

const UpdateNote = () => {
  const { id } = useParams();
  const history = useHistory();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(
        `http://127.0.0.1:3000/notes/${id}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Note updated successfully:", response.data);
        navigate("/dashboard");
        history.push(`/notes/${id}`);
      })
      .catch((error) => {
        console.error("Error updating note:", error);
      });
  };

  return (
    <div className="update-note-container">
      <div className="update-note-card">
        <h2>Update Note</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter new content..."
        />
        <button onClick={handleUpdate}>Update Note</button>
      </div>
    </div>
  );
};

export default UpdateNote;