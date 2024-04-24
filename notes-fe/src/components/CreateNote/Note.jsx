/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Note.css";

const CreateNote = () => {
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = { content };

        try {
            await axios.post("http://127.0.0.1:3000/create", note, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("New Note Added");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    return (
        <div className="CreateForm">
            <div className="FormContent">
                <form onSubmit={handleSubmit}>
                    <div className="NoteForm">
                        <h3 className="TextHead">Note</h3>
                        <textarea
                            className="NoteText"
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <button className="CreateNoteBtn" type="submit">
                        Create Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;