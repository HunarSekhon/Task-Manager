import React, { useState, useEffect } from 'react';

const Sidebar = ({ sidebarOpen, task, closeSidebar, saveTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');  // State to handle the new comment input
  const [comments, setComments] = useState([]);  // State to hold task comments
  const [reply, setReply] = useState('');  // State to handle the reply input
  const [selectedComment, setSelectedComment] = useState(null);  // Track which comment is selected for reply

  // Set initial task data and comments when the sidebar is opened
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setComments(task.comments || []);  // Initialize comments if they exist
    }
  }, [task]);

  const handleSave = () => {
    const updatedTask = { 
      title, 
      description, 
      comments 
    };
    saveTask(task.id, updatedTask);  // Save the task and its comments/replies
    closeSidebar(); // Close the sidebar after saving
  };

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: Date.now(),
        text: comment,
        replies: []  // New comment starts with no replies
      };
      setComments([...comments, newComment]);  // Add the new comment
      setComment('');  // Clear the comment input field
    }
  };

  const handleAddReply = () => {
    if (reply.trim() !== '' && selectedComment) {
      const updatedComments = comments.map(cmt => {
        if (cmt.id === selectedComment.id) {
          return {
            ...cmt,
            replies: [...cmt.replies, { id: Date.now(), text: reply }]
          };
        }
        return cmt;
      });
      setComments(updatedComments);  // Update the comments with the new reply
      setReply('');  // Clear the reply input field
      setSelectedComment(null);  // Deselect the comment
    }
  };

  const handleSelectComment = (comment) => {
    setSelectedComment(comment);  // Set the comment to reply to
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <h2>Edit Task</h2>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task Title" 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Task Description" 
        />

        {/* Comments Section */}
        <div className="comments-section">
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <div>
                  <p>{comment.text}</p>
                  <button onClick={() => handleSelectComment(comment)}>Reply</button>
                  {/* Show replies */}
                  {comment.replies.length > 0 && (
                    <ul>
                      {comment.replies.map((reply) => (
                        <li key={reply.id}>{reply.text}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="Add a comment" 
          />
          <button onClick={handleAddComment}>Add Comment</button>

          {/* Reply Section (Visible when a comment is selected) */}
          {selectedComment && (
            <div className="reply-section">
              <textarea 
                value={reply} 
                onChange={(e) => setReply(e.target.value)} 
                placeholder="Add a reply" 
              />
              <button onClick={handleAddReply}>Add Reply</button>
              <button onClick={() => setSelectedComment(null)}>Cancel Reply</button>
            </div>
          )}
        </div>

        <button onClick={handleSave}>Save</button>
        <button className="cancel" onClick={closeSidebar}>Cancel</button>
      </div>
    </div>
  );
};

export default Sidebar;
