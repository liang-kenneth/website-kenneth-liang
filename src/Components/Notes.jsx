import React, { useState, useEffect } from "react";
import Axios from "axios";

import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";

import Highlight from "@mui/icons-material/Highlight";
import AddIcon from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function initialize() {
      const response = await Axios.get("/initial");
      setNotes(response.data);
    }
    initialize();
  }, []);

  // -----------------------------------------------------------
  // Create user generated notes, add to dashboard and upload to MongoDB
  const createArea = () => {
    // Initialize useState variables
    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
      title: "",
      content: "",
    });

    function handleChange(event) {
      // Destructure note title and contents from user keystrokes
      const { name, value } = event.target;

      // Record user title and contents keystrokes
      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]: value,
        };
      });
    }

    // On submit, use Axios to send user note to NodeJS. NodeJS server to handle upload to MongoDB
    async function submitNote(event) {
      // Prevent default page refresh
      event.preventDefault();

      const newNote = await Axios.post("/create-note", note);
      setNotes((prev) => prev.concat([newNote.data]));

      // Reset the text fields
      setNote({
        title: "",
        content: "",
      });
    }

    function expand() {
      setExpanded(true);
    }

    return (
      <div>
        <form className="create-note">
          {isExpanded && (
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          )}

          <textarea
            name="content"
            onClick={expand}
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows={isExpanded ? 3 : 1}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    );
  };
  // -----------------------------------------------------------

  // -----------------------------------------------------------
  // Render notes on screen from MongoDB data
  function Note(props) {
    return (
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button
          onClick={async () => {
            const test = await Axios.delete(`/note/${props.id}`);
            setNotes((prevNotes) => {
              return prevNotes.filter((noteItem) => {
                return noteItem._id !== props.id;
              });
            });
          }}
        >
          <Delete />
        </button>
      </div>
    );
  }
  // -----------------------------------------------------------

  return (
    <Box>
      <header className="header-note">
        <h1>
          <Highlight />
          Keeper
        </h1>
      </header>
      {createArea()}
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
          />
        );
      })}
    </Box>
  );
}

export default Notes;
