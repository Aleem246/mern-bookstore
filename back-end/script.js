import dotenv from "dotenv";
import express from "express";
import cors from "cors"; //cross origin resource sharing (allows us to fetch data , so both websites can comm.)
import { connectDB } from "./config/connectDB.js";
import { Book } from "./models/Book.js";
import multer from "multer";

const app = express();

dotenv.config();
const port = process.env.PORT;
// console.log(process.env.PORT);

//middle ware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); //./
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("App is running successfully");
});

app.get("/books", async (req, res) => {
    try {
      const category = req.query.category;
      const filter = {};
      console.log("category specified " + category);
  
      if (category) {
        filter.category = category;
      }
  
      const data = await Book.find(filter);

      res.json(data);
      
    } catch (err) {
      res
        .sendStatus(500)
        .json({ error: " An error occured while fetching books" });
    }
  });

app.get("/books/:_id", async (req, res) => {
  try {
    const bookid = req.params._id;

    const data = await Book.findById(bookid); //findbyId({X})
    // data = data.json();

    res.json(data); //{}X
  } catch (err) {
    res.status(500).json({ error: "An error occured while fetching the data" }); //status (S X)
  }
});

app.post("/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, author, slug, stars, description, category } = req.body;

    const thumbnail = req.file.filename;
    // console.log(req.body);

    const newBook = new Book({
      title: title,
      author: author,
      slug: slug,
      stars: Number(stars),
      description: description,
      category: category,
      thumbnail: thumbnail,
    });

    await newBook.save();
    res.status(201).json({ message: "Book created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the book" });
  }
});

//to update an existing book
app.put("/books/:_id", upload.single("thumbnail"), async (req, res) => {
  try {
    const bookId = req.params._id;
    const { title, slug, author, stars, description, category } = req.body;

    const updateBook = {
      title: title,
      author: author,
      slug: slug,
      stars: Number(stars),
      description: description,
      category: category.split(",").map((c) => c.trim()),
      // thumbnail:thumbnail,
    };
    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updateBook, { new: true });
    res.status(200).json({ message: "Book created successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the book" });
  }
});

//delete
app.delete("/books/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    await Book.deleteOne({ _id: bookId });
    res.json("Book deleted! " + req.body.bookId);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});



app.listen(port, () => {
  console.log("App is running at http://localhost:" + port);
  connectDB();
});
