import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import noimage from "../../assets/noimage.jpg";


const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author , setAuthor] = useState("");
  const [stars, setStars] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [thumbnail,setThumbnail] = useState("");
  const [image, setImage] = useState(noimage);

  const navigate = useNavigate();

  const createBook = async (e) => {
    e.preventDefault(); //refershing
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author",author);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category",categories );
    formData.append("thumbnail", thumbnail);

    try {
      const res = await fetch("http://localhost:8081/books", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setTitle("");
        setSlug("");
        setAuthor("");
        setThumbnail(null);
        setSubmitted(true);
        setDescription("");
        console.log("Book added successfully");
        setTimeout(() => navigate("/books"), 1000) ;
        console.log(data);
      } else {
        console.log("Failed to submit data");
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  
  
  const   onImageChange=(e)=>{
    if(e.target.files && e.target.files[0]){
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
  }
}

  const handleCategoryChange= (e)=>{
    setCategories(e.target.value.split(",").map((category)=>category.trim()));
  }
  return (
    <div>
      <h1>Create Book</h1>
      <p>Thisi is where we use nodejs , express & mgdb to grab data .</p>

      {submitted ? (
     
        <p>Data Submitted successfully</p>
      
        
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">

            <label>Upload Thumbnail</label>
            <img src={image} alt="preview image" />
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
              <label>Author: </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
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
              <input type="text" value={categories} onChange={handleCategoryChange}/>
            </div>

            <input type="submit" value="Add Book" />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateBook;
