import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import noimage from "../../assets/noimage.jpg";

const EditBook = () => {
  const id = useParams(); //{_id}
  const navigate = useNavigate();

  const baseurl = `http://localhost:8081/books/${id._id}`;

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");

  const [thumbnail, setThumbnail] = useState(null);

  const fetchData = async () => {
    console.log(id._id);

    try {
      const res = await fetch(baseurl);

      if (!res.ok) {
        throw new Error("Failed to fetch data!");
      }
      const data = await res.json();
      setBookId(data._id);
      setTitle(data.title);
      setSlug(data.slug);
      setStars(data.stars);
      setDescription(data.description);
      setCategories(data.category || []);
      setThumbnail(data.thumbnail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateBook = async (e) => {
    e.preventDefault(); //refershing
    const formData = new FormData();
    // formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories.join(', '));
    // formData.append("thumbnail", thumbnail);

    if (thumbnail instanceof File) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const res = await fetch(baseurl, {
        method: "PUT",
        body: formData,
      });

      const resData = await res.json();
      if (res.ok) {
       
        setSubmitted(true);
        console.log("Book updated successfully");
        setTimeout(() => navigate("/books"), 1500);
      } else {
        console.log("Failed to submit data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };
  const removeBook= async(e)=>{
    e.preventDefault();
    try{
        console.log(bookId);
        const res = await fetch(baseurl, {method: "DELETE",});
        if(res.ok){
            navigate("/books");
            console.log("Book Removed!");
        }
    }catch(err){
        console.log(err);
    }

  }

  const handleCategoryChange = (e) => {
    
    setCategories(e.target.value.split(',').map((category) => category.trim()));
  };

  const categoriesString = categories.join(', ');
  return (
    <div>
      <h1>Edit Book</h1>
      <p>This is where we use nodejs , express & mgdb to grab data .</p>

      <button onClick={removeBook} className="delete">Delete Book </button>

      {submitted ? (
        <p>Data Submitted successfully</p>
      ) : (
        <form className="bookdetails" onSubmit={updateBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>

            {image ? (
              <img src={`${image}`} alt="preview image" />
            ) : (
              <img
                src={`http://localhost:8081/uploads/${thumbnail}`}
                alt="preview image"
              />
            )}
            <br />
            <input
              type="file"
              accept="image/gif, image/png, image/jpg "
              onChange={onImageChange} 
            />
          </div>

          <div className="col-2">
            <div>
              <br />
              <label>Title: </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <br />
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <br />

            <div>
              <br />
              <label>Stars</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>

            <br />
            <div>
              <br />
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <br />
            <div>
              <br />
              <label>Categories (comma-seperated)</label>
              <input
                type="text"
                value={categoriesString}
                onChange={handleCategoryChange}
              />
            </div>

            <input type="submit" value="Update Book" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditBook;
