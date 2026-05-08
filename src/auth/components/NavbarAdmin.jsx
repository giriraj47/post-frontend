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

  const font = "'Plus Jakarta Sans', sans-serif";

  return (
    <>
      <nav style={{ ...styles.navbar, fontFamily: font }}>
        <div style={styles.logo}>
          <span style={{ ...styles.logoMark, fontFamily: font }}>P</span>
          <span style={{ ...styles.logoText, fontFamily: font }}>Posty</span>
          <span style={{ ...styles.adminBadge, fontFamily: font }}>Admin</span>
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            style={{ ...styles.createButton, fontFamily: font }}
            onClick={openCreateModal}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#B05525")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#C9602E")}
          >
            + New post
          </button>
          <button
            type="button"
            style={{ ...styles.logoutButton, fontFamily: font }}
            onClick={onLogout}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            Sign out
          </button>
        </div>
      </nav>

      {showCreate && (
        <div
          style={styles.overlay}
          onClick={(e) => e.target === e.currentTarget && closeCreateModal()}
        >
          <div style={{ ...styles.modal, fontFamily: font }}>
            <div style={styles.modalHeader}>
              <h2 style={{ ...styles.modalTitle, fontFamily: font }}>
                New post
              </h2>
              <button
                type="button"
                style={styles.closeBtn}
                onClick={closeCreateModal}
              >
                ✕
              </button>
            </div>

            <form onSubmit={createPost} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={{ ...styles.label, fontFamily: font }}>
                  Title
                </label>
                <input
                  style={{ ...styles.input, fontFamily: font }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
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
              </div>

              <div style={styles.fieldGroup}>
                <label style={{ ...styles.label, fontFamily: font }}>
                  Description
                </label>
                <textarea
                  style={{ ...styles.textarea, fontFamily: font }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write something..."
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
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  style={{ ...styles.cancelButton, fontFamily: font }}
                  onClick={closeCreateModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    fontFamily: font,
                    opacity: isCreating ? 0.7 : 1,
                  }}
                  disabled={isCreating}
                  onMouseEnter={(e) =>
                    !isCreating && (e.target.style.backgroundColor = "#B05525")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#C9602E")
                  }
                >
                  {isCreating ? "Publishing…" : "Publish post"}
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
    height: "64px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1C1B18",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "18px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoMark: {
    width: "30px",
    height: "30px",
    backgroundColor: "#C9602E",
    color: "white",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
  },
  logoText: {
    fontSize: "17px",
    fontWeight: "700",
    color: "white",
    letterSpacing: "0.3px",
  },
  adminBadge: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#C9602E",
    backgroundColor: "rgba(201,96,46,0.15)",
    border: "1px solid rgba(201,96,46,0.3)",
    padding: "2px 8px",
    borderRadius: "20px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  createButton: {
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
  logoutButton: {
    padding: "8px 16px",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "7px",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.75)",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "background-color 0.15s",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(28,27,24,0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "24px",
  },
  modal: {
    width: "100%",
    maxWidth: "480px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E2E1DC",
    borderRadius: "16px",
    padding: "28px",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#1C1B18",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "14px",
    color: "#6B6A65",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#1C1B18",
  },
  input: {
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1px solid #E2E1DC",
    fontSize: "14px",
    color: "#1C1B18",
    backgroundColor: "#FAFAF8",
    outline: "none",
  },
  textarea: {
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1px solid #E2E1DC",
    fontSize: "14px",
    color: "#1C1B18",
    backgroundColor: "#FAFAF8",
    outline: "none",
    minHeight: "120px",
    resize: "vertical",
  },
  inputFocus: {
    borderColor: "#C9602E",
    boxShadow: "0 0 0 3px rgba(201,96,46,0.12)",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "4px",
  },
  cancelButton: {
    padding: "9px 16px",
    border: "1px solid #E2E1DC",
    borderRadius: "7px",
    backgroundColor: "white",
    color: "#6B6A65",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
  },
  submitButton: {
    padding: "9px 18px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#C9602E",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background-color 0.15s",
  },
};

export default NavbarAdmin;
