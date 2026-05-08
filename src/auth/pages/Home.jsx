import { useState } from "react";
import Navbar from "../components/Navbar";
import NavbarAdmin from "../components/NavbarAdmin";
import Posts from "../components/Posts";
import PostsAdmin from "../components/PostsAdmin";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      {user?.role === "admin" ? (
        <NavbarAdmin onPostCreated={handlePostCreated} />
      ) : (
        <Navbar />
      )}
      {user?.role === "admin" ? (
        <PostsAdmin refreshKey={refreshKey} />
      ) : (
        <Posts />
      )}
    </>
  );
};

export default Home;
