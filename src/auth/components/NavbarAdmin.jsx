import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function NavbarAdmin({ onPostCreated }) {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  const api = axios.create({
    baseURL: "https://post-backend-293e.onrender.com",
    withCredentials: true,
  });

  const openCreateModal = () => setShowCreate(true);
  const closeCreateModal = () => {
    setShowCreate(false);
    setTitle("");
    setDescription("");
  };

  const createPost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please enter both title and description.");
      return;
    }

    try {
      setIsCreating(true);
      await api.post("/api/v1/post/create", {
        title: title.trim(),
        description: description.trim(),
      });
      alert("Post created successfully.");
      closeCreateModal();
      onPostCreated?.();
    } catch (error) {
      console.error("Error creating post:", error);
      alert(
        error.response?.data?.message ||
          "Unable to create post. Please try again.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>Posty</h1>

        <div style={styles.rightSection}>
          <button
            type="button"
            style={styles.createButton}
            onClick={openCreateModal}
          >
            Create Post
          </button>
          <button type="button" style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {showCreate && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Create New Post</h2>
              <button
                type="button"
                style={styles.modalClose}
                onClick={closeCreateModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={createPost} style={styles.form}>
              <label style={styles.formLabel}>
                Title
                <input
                  style={styles.formInput}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                />
              </label>

              <label style={styles.formLabel}>
                Description
                <textarea
                  style={styles.formTextarea}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter post description"
                />
              </label>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={styles.cancelButton}
                  onClick={closeCreateModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={isCreating}
                >
                  {isCreating ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  navbar: {
    height: "70px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    color: "white",
  },

  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "1px",
  },

  rightSection: {
    display: "flex",
    gap: "15px",
  },

  createButton: {
    padding: "10px 18px",
    border: "1px solid #28a745",
    borderRadius: "6px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },

  adminButton: {
    padding: "10px 18px",
    border: "1px solid white",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },

  logoutButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#111",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  modalTitle: {
    margin: 0,
    fontSize: "22px",
  },

  modalClose: {
    background: "transparent",
    border: "none",
    fontSize: "26px",
    lineHeight: 1,
    cursor: "pointer",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  formLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "14px",
    color: "#333",
  },

  formInput: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  formTextarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "vertical",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
  },

  cancelButton: {
    padding: "10px 18px",
    border: "1px solid #6c757d",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#6c757d",
    cursor: "pointer",
    fontSize: "14px",
  },

  submitButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default NavbarAdmin;
