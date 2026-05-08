import axios from "axios";
import { useEffect, useState } from "react";

function PostsAdmin({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshKey]);

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
      setPosts((prev) =>
        prev.map((post) =>
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
    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) return;
    try {
      await api.delete(`/api/v1/post/delete/${postId}`);
      setPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const font = "'Plus Jakarta Sans', sans-serif";

  return (
    <div style={{ ...styles.container, fontFamily: font }}>
      <div style={styles.pageHeader}>
        <h1 style={{ ...styles.heading, fontFamily: font }}>Posts</h1>
        <span style={{ ...styles.count, fontFamily: font }}>
          {!loading &&
            `${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
        </span>
      </div>

      {loading ? (
        <div style={styles.emptyState}>
          <p style={{ ...styles.emptyText, fontFamily: font }}>
            Loading posts…
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={{ ...styles.emptyText, fontFamily: font }}>
            No posts yet. Create one!
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {posts.map((post) => (
            <div key={post._id} style={styles.card}>
              {editingPostId === post._id ? (
                /* ── Edit mode ── */
                <>
                  <input
                    style={{ ...styles.editTitleInput, fontFamily: font }}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onFocus={(e) =>
                      Object.assign(e.target.style, styles.inputFocus)
                    }
                    onBlur={(e) =>
                      Object.assign(e.target.style, {
                        borderColor: "#E2E1DC",
                        boxShadow: "none",
                      })
                    }
                  />
                  <textarea
                    style={{ ...styles.editTextarea, fontFamily: font }}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    onFocus={(e) =>
                      Object.assign(e.target.style, styles.inputFocus)
                    }
                    onBlur={(e) =>
                      Object.assign(e.target.style, {
                        borderColor: "#E2E1DC",
                        boxShadow: "none",
                      })
                    }
                  />
                  <div style={styles.editActions}>
                    <button
                      type="button"
                      style={{ ...styles.cancelBtn, fontFamily: font }}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      style={{ ...styles.saveBtn, fontFamily: font }}
                      onClick={() => saveEdit(post._id)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#B05525")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#C9602E")
                      }
                    >
                      Save changes
                    </button>
                  </div>
                </>
              ) : (
                /* ── View mode ── */
                <>
                  <div style={styles.cardHeader}>
                    <h2 style={{ ...styles.title, fontFamily: font }}>
                      {post.title}
                    </h2>
                    <div style={styles.cardActions}>
                      <button
                        type="button"
                        style={{ ...styles.editBtn, fontFamily: font }}
                        onClick={() => startEdit(post)}
                        onMouseEnter={(e) => (
                          (e.target.style.borderColor = "#C9602E"),
                          (e.target.style.color = "#C9602E")
                        )}
                        onMouseLeave={(e) => (
                          (e.target.style.borderColor = "#E2E1DC"),
                          (e.target.style.color = "#6B6A65")
                        )}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        style={{ ...styles.deleteBtn, fontFamily: font }}
                        onClick={() => deletePost(post._id)}
                        onMouseEnter={(e) => (
                          (e.target.style.backgroundColor = "#B91C1C"),
                          (e.target.style.borderColor = "#B91C1C")
                        )}
                        onMouseLeave={(e) => (
                          (e.target.style.backgroundColor = "white"),
                          (e.target.style.borderColor = "#FECACA"),
                          (e.target.style.color = "#DC2626")
                        )}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div style={styles.divider} />
                  <p style={{ ...styles.description, fontFamily: font }}>
                    {post.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 48px",
    backgroundColor: "#F5F4F0",
    minHeight: "calc(100vh - 64px)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  pageHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "12px",
    marginBottom: "32px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1C1B18",
    margin: 0,
  },
  count: {
    fontSize: "13px",
    color: "#6B6A65",
    fontWeight: "500",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: "22px 26px",
    borderRadius: "12px",
    border: "1px solid #E2E1DC",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
  },
  title: {
    margin: "0 0 14px 0",
    fontSize: "17px",
    fontWeight: "700",
    color: "#1C1B18",
    lineHeight: "1.3",
    flex: 1,
  },
  divider: {
    height: "1px",
    backgroundColor: "#F0EFE9",
    marginBottom: "14px",
  },
  description: {
    color: "#4A4944",
    lineHeight: "1.7",
    fontSize: "14px",
    margin: 0,
  },
  cardActions: {
    display: "flex",
    gap: "8px",
    flexShrink: 0,
  },
  editBtn: {
    padding: "6px 14px",
    border: "1px solid #E2E1DC",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#6B6A65",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.15s",
  },
  deleteBtn: {
    padding: "6px 14px",
    border: "1px solid #FECACA",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#DC2626",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "500",
    transition: "all 0.15s",
  },
  editTitleInput: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    border: "1px solid #E2E1DC",
    backgroundColor: "#FAFAF8",
    color: "#1C1B18",
    outline: "none",
    marginBottom: "12px",
    boxSizing: "border-box",
  },
  editTextarea: {
    width: "100%",
    minHeight: "110px",
    padding: "10px 12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #E2E1DC",
    backgroundColor: "#FAFAF8",
    color: "#1C1B18",
    outline: "none",
    resize: "vertical",
    marginBottom: "14px",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderColor: "#C9602E",
    boxShadow: "0 0 0 3px rgba(201,96,46,0.12)",
  },
  editActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
  },
  cancelBtn: {
    padding: "8px 14px",
    border: "1px solid #E2E1DC",
    borderRadius: "7px",
    backgroundColor: "white",
    color: "#6B6A65",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  },
  saveBtn: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#C9602E",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background-color 0.15s",
  },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  emptyText: {
    color: "#6B6A65",
    fontSize: "14px",
  },
};

export default PostsAdmin;
