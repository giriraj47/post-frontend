import axios from "axios";
import { useEffect, useState } from "react";

function PostsAdmin({}) {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const api = axios.create({
    baseURL: "https://post-backend-293e.onrender.com",
    withCredentials: true,
  });

  const fetchPosts = async () => {
    try {
      const response = await api.get("/api/v1/post/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const startEdit = (post) => {
    setEditingPostId(post._id);
    setEditTitle(post.title);
    setEditDescription(post.description);
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (postId) => {
    try {
      const response = await api.patch(`/api/v1/post/update/${postId}`, {
        title: editTitle,
        description: editDescription,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, ...response.data.post } : post,
        ),
      );
      cancelEdit();
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    }
  };

  const deletePost = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );
    if (!confirmed) return;

    try {
      await api.delete(`/api/v1/post/delete/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Posts</h1>

      <div style={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.titleWrapper}>
                {editingPostId === post._id ? (
                  <input
                    style={styles.titleInput}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  <h2 style={styles.title}>{post.title}</h2>
                )}
              </div>

              <div style={styles.actionButtons}>
                {editingPostId === post._id ? (
                  <>
                    <button
                      type="button"
                      style={styles.saveButton}
                      onClick={() => saveEdit(post._id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      style={styles.cancelButton}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      style={styles.editButton}
                      onClick={() => startEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      style={styles.deleteButton}
                      onClick={() => deletePost(post._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {editingPostId === post._id ? (
              <textarea
                style={styles.descriptionInput}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            ) : (
              <p style={styles.description}>{post.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },

  heading: {
    marginBottom: "30px",
    fontSize: "32px",
  },

  postsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    position: "relative",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
  },

  titleWrapper: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    marginBottom: "10px",
    fontSize: "24px",
    wordBreak: "break-word",
  },

  titleInput: {
    width: "100%",
    padding: "10px",
    fontSize: "22px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  actionButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  editButton: {
    padding: "8px 12px",
    border: "1px solid #007bff",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#007bff",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "8px 12px",
    border: "1px solid #dc3545",
    borderRadius: "6px",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },

  saveButton: {
    padding: "8px 12px",
    border: "1px solid #28a745",
    borderRadius: "6px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
  },

  cancelButton: {
    padding: "8px 12px",
    border: "1px solid #6c757d",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#6c757d",
    cursor: "pointer",
  },

  description: {
    color: "#555",
    lineHeight: "1.6",
    marginTop: "16px",
  },

  descriptionInput: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "16px",
  },
};

export default PostsAdmin;
