import axios from "axios";
import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);

  const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  useEffect(() => {
    api
      .get("/api/v1/post/posts")
      .then((response) => {
        console.log("Fetched posts:", response.data);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Posts</h1>

      <div style={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post._id} style={styles.card}>
            <h2 style={styles.title}>{post.title}</h2>

            <p style={styles.description}>{post.description}</p>
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
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)",
  },

  title: {
    marginBottom: "10px",
    fontSize: "24px",
  },

  description: {
    color: "#555",
    lineHeight: "1.6",
  },
};

export default Posts;
