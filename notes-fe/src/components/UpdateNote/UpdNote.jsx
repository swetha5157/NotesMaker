import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useHistory from "/src/useHistory";
import { useNavigate } from "react-router-dom";
const UpdateNote = () => {
  const { id } = useParams(); // Get the note ID from the URL params
  const history = useHistory(); // To navigate back after updating
 const navigate=useNavigate();
  const [content, setContent] = useState(""); // State to store the updated note content

  // Fetch the current note content from the server when the component mounts
  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        setContent(response.data.content);
      })
      .catch(error => {
        console.error("Error fetching note:", error);
      });
  }, [id]);

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:3000/notes/${id}`, { content }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(response => {
        console.log("Note updated successfully:", response.data);
        navigate('/dashboard');
        history.push(`/notes/${id}`);
      })
      .catch(error => {
        console.error("Error updating note:", error);
      });
  };

  return (
    <div>
      <h2>Update Note</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter new content..."
      />
      <button onClick={handleUpdate}>Update Note</button>
    </div>
  );
};

export default UpdateNote;