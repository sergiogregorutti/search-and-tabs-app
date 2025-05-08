import { useState, useEffect } from "react";
import { Routes, Route, Link, useSearchParams } from "react-router-dom";

function Header({ search, updateSearch }) {
  return (
    <header>
      <div
        style={{
          padding: "15px",
          backgroundColor: "#4A90E2",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            width: "100%",
            maxWidth: "470px",
            border: "none",
            borderRadius: "15px",
          }}
        />
      </div>

      <nav
        style={{
          background: "#4A90E2",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <Link
            to={`/users?q=${search}`}
            style={{
              backgroundColor: "#3B7BD5",
              padding: "15px 20px",
              textAlign: "center",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Users
          </Link>
          <Link
            to={`/posts?q=${search}`}
            style={{
              backgroundColor: "#6FA1E0",
              padding: "15px 20px",
              textAlign: "center",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Posts
          </Link>
        </div>
      </nav>
    </header>
  );
}

function UsersPage({ search }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {filtered.map((u, i) => (
          <div
            key={u.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              borderBottom: i < filtered.length - 1 ? "1px solid #ccc" : "none",
            }}
          >
            <img
              src="https://placehold.co/40x40"
              alt={u.name}
              style={{
                borderRadius: "50%",
              }}
            />
            {u.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function PostsPage({ search }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        {filtered.map((p, i) => (
          <div
            key={p.id}
            style={{
              padding: "15px",
              borderBottom: i < filtered.length - 1 ? "1px solid #ccc" : "none",
            }}
          >
            {p.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const updateSearch = (text) => {
    setSearch(text);
    setSearchParams({ q: text });
  };

  return (
    <>
      <Header search={search} updateSearch={updateSearch} />
      <Routes>
        <Route path="/users" element={<UsersPage search={search} />} />
        <Route path="/posts" element={<PostsPage search={search} />} />
        <Route path="*" element={<UsersPage search={search} />} />
      </Routes>
    </>
  );
}

export default App;
