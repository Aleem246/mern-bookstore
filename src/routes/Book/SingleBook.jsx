import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleBook = () => {
  const [data, setData] = useState(null); //null

  const { _id } = useParams(); //{}

  const baseurl = `http://localhost:8081/books/${_id}`; //from backend to front end

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseurl);

        if (!res.ok) {
          throw new Error("Failed to fetch the data from database");
        }
        const jsonData = await res.json(); //fetch(url) -> x= .json -> setdata(x)
        setData(jsonData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [_id]);


const StarRating = ({numberOfStars})=>{
  const stars = [];
  for(let i=0; i< numberOfStars;i++){
    stars.push( <span key={i}>⭐</span> )
  }
  return <div>Rating: {stars}</div>
}


  if(!data) return <div>loading...</div>

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Link to="/books">GO back</Link>

      <div className="bookDetails">
        <div className="col-1">
         
         
            <img
              src={`http://localhost:8081/uploads/${data.thumbnail}`}
              alt={data.title || "Book cover"}
            />          
        </div>

        <div className="col-2">
          <p>Title : {data.title}</p>
          <p>Author : {data.author}</p>
          {/* <p>Stars : {data.stars}</p> */}
          <StarRating numberOfStars={data.stars}/>
          <p>Slug: {data.slug} </p>
          <p>Description : {data.description}</p>
        </div>
      </div>

      <Link to = {`/books/edit/${data._id}`} >✏️Edit book</Link>
    </div>
  );
};

export default SingleBook;
