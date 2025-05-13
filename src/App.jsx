import { useState } from 'react'

import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import Book from "../src/routes/Book/Book.jsx"; 
import About from './routes/About/About.jsx';
import CreateBook from './routes/Book/CreateBook.jsx';
import EditBook from './routes/Book/EditBook.jsx';
import SingleBook from './routes/Book/SingleBook.jsx';
import Home from './routes/Home/Home.jsx';
import Header from './components/header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/books' element={<Book/>}></Route>
          <Route path='/books/:_id' element={<SingleBook/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/createBook' element={<CreateBook/>}></Route>
          <Route path='/books/edit/:_id' element={<EditBook/>}></Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App
