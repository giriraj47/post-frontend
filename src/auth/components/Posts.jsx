import axios from "axios";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  useEffect(() => {
    api
      .get("/api/v1/post/posts")
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => setLoading(false));
  }, []);

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
          <p style={{ ...styles.emptyText, fontFamily: font }}>No posts yet.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {posts.map((post) => (
            <div key={post._id} style={styles.card}>
              <h2 style={{ ...styles.title, fontFamily: font }}>
                {post.title}
              </h2>
              <div style={styles.divider} />
              <p style={{ ...styles.description, fontFamily: font }}>
                {post.description}
              </p>
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
    padding: "24px 28px",
    borderRadius: "12px",
    border: "1px solid #E2E1DC",
  },
  title: {
    margin: "0 0 14px 0",
    fontSize: "17px",
    fontWeight: "700",
    color: "#1C1B18",
    lineHeight: "1.3",
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

export default Posts;
