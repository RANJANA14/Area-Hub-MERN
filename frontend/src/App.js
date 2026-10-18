import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [places, setPlaces] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState("Featured Area");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const [editId, setEditId] = useState(null);

  // GET DATA
  const getPlaces = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/places");
      setPlaces(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  // ADD OR UPDATE
  const savePlace = async () => {

    if (!name || !description || !rating) {
      alert("Fill all fields");
      return;
    }

    const data = {
      name,
      type,
      description,
      rating
    };

    try {

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/places/${editId}`,
          data
        );

        alert("Place Updated");

      } else {

        await axios.post(
          "http://localhost:5000/api/places",
          data
        );

        alert("Place Added");
      }

      setName("");
      setDescription("");
      setRating("");
      setType("Featured Area");
      setEditId(null);

      getPlaces();

    } catch (err) {
      alert("Error");
    }
  };

  // DELETE
  const deletePlace = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/places/${id}`
    );

    getPlaces();
  };

  // EDIT
  const editPlace = (place) => {

    setName(place.name);
    setType(place.type);
    setDescription(place.description);
    setRating(place.rating);

    setEditId(place._id);
  };

  // FILTER
  const filteredPlaces = places.filter((p) => {

    const matchCategory =
      selectedCategory === ""
        ? false
        : p.type === selectedCategory;

    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  // LOGIN PAGE
  if (!loggedIn) {

    return (

      <div style={styles.loginPage}>

        <div style={styles.loginBox}>

          <h1 style={{ color: "#00aaff" }}>
            🌍 AREA HUB
          </h1>

          <p style={{ color: "white" }}>
            Smart Tourism & Area Discovery
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            style={styles.input}
          />

          <button
            style={styles.button}
            onClick={() => setLoggedIn(true)}
          >
            Login
          </button>

        </div>

      </div>
    );
  }

  // HOME PAGE
  return (

    <div style={styles.container}>

      {/* NAVBAR */}
      <div style={styles.navbar}>

        <h1 style={{ color: "#00aaff" }}>
          🌍 AREA HUB
        </h1>

        <div>

          <input
            type="text"
            placeholder="🔍 Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />

          <button
            style={styles.logout}
            onClick={() => setLoggedIn(false)}
          >
            Logout
          </button>

        </div>

      </div>

      {/* CATEGORY BUTTONS */}
      <div style={styles.categoryRow}>

        <button
          style={styles.categoryBtn}
          onClick={() => setSelectedCategory("Featured Area")}
        >
          Featured Area
        </button>

        <button
          style={styles.categoryBtn}
          onClick={() => setSelectedCategory("Interesting Area")}
        >
          Interesting Area
        </button>

        <button
          style={styles.categoryBtn}
          onClick={() => setSelectedCategory("History Place")}
        >
          History Place
        </button>

      </div>

      {/* FORM */}
      <div style={styles.formBox}>

        <h2 style={{ textAlign: "center" }}>
          Add New Place
        </h2>

        <input
          type="text"
          placeholder="Place Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.input}
        >

          <option>Featured Area</option>
          <option>Interesting Area</option>
          <option>History Place</option>

        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.button}
          onClick={savePlace}
        >
          {editId ? "Update Place" : "Add Place"}
        </button>

      </div>

      {/* SHOW ONLY SELECTED CATEGORY */}
      <div style={styles.grid}>

        {filteredPlaces.map((place) => (

          <div key={place._id} style={styles.card}>

            <h2>{place.name}</h2>

            <p>{place.description}</p>

            <p>
              ⭐ {place.rating}
            </p>

            <div style={{ marginTop: 15 }}>

              <button
                style={styles.editBtn}
                onClick={() => editPlace(place)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deletePlace(place._id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

// STYLES
const styles = {

  container: {
    background: "black",
    minHeight: "100vh",
    padding: 20,
    fontFamily: "Arial",
    color: "white"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  search: {
    padding: 10,
    border: "1px solid #00aaff",
    background: "black",
    color: "white",
    marginRight: 10,
    borderRadius: 8
  },

  logout: {
    background: "red",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 8,
    cursor: "pointer"
  },

  categoryRow: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginTop: 30
  },

  categoryBtn: {
    background: "#00aaff",
    color: "black",
    border: "none",
    padding: "12px 20px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold"
  },

  formBox: {
    width: 400,
    margin: "30px auto",
    border: "1px solid #00aaff",
    padding: 20,
    borderRadius: 10
  },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#111",
    color: "white",
    border: "1px solid #00aaff",
    borderRadius: 8
  },

  button: {
    width: "100%",
    padding: 12,
    marginTop: 15,
    background: "#00aaff",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer"
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    marginTop: 30
  },

  card: {
    width: 280,
    background: "#111",
    border: "1px solid #00aaff",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 0px 10px #00aaff"
  },

  editBtn: {
    background: "orange",
    border: "none",
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    cursor: "pointer"
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: 10,
    borderRadius: 8,
    cursor: "pointer"
  },

  loginPage: {
    height: "100vh",
    background: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  loginBox: {
    width: 350,
    padding: 30,
    border: "1px solid #00aaff",
    borderRadius: 10,
    textAlign: "center",
    background: "#111"
  }
};

export default App;