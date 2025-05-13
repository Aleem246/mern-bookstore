import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Book/Book.css";
const Book = () => {
  const baseurl = "http://localhost:8081/books"; //from backend to front-end
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseurl;

        if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch the data from database");
        }

        const jsonData = await res.json();

        setIsLoading(false);
        setData(jsonData);
        
      } catch (err) {
        console.log(err);
        setError("Error during fetching the data");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Books</h1>
      <p>this is where we fetch data using express nodejs mongodb</p>

      <h2>Fetch Example</h2>

      <Link to="/createBook" >+ Add a book</Link>
  
      <div className="filters">
        <label> Categories </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">ALL</option>
          <option value="self-help">self-help </option>
          <option value="non-fiction">non-fiction</option>
          <option value="crime">Crime</option>
          <option value="history">History</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="love">Love</option>
          <option value="fiction"> Action </option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="list">
          {data.map((ele) => (  //()=> implicite return {}=>should write retuen manually
              <li key={ele._id}>
                <Link to={`/books/${ele._id}`}>
                  <img
                    src={`http://localhost:8081/uploads/${ele.thumbnail}`}
                    alt={ele.slug}
                  />
                  <h5>{ele.title}</h5>
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default Book;
