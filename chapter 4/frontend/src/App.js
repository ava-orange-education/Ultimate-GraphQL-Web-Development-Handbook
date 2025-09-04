import "./App.css";
import DisplayPosts from "./DisplayPosts";
import CreatePostForm from "./CreatePostForm"; // Import the new component
import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  return (
    <>
      <header>
        <h1 style={{ textAlign: "center" }}>Blog Posts</h1>
      </header>
      <div className="App">
        {!showForm && (
          <>
            <button
              onClick={() => setShowForm(true)}
              className="new-post-button"
            >
              New Post
            </button>
            <DisplayPosts />
          </>
        )}
        {/* Button to toggle form visibility */}
        {showForm && <CreatePostForm setShowForm={setShowForm} />}{" "}
        {/* Conditionally render the form */}
      </div>
    </>
  );
}

export default App;
