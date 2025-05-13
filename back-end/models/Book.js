import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    author:{
        type : String,
    },
      thumbnail:{
        type : String,
      },
      slug:{
        type: String,
      }, 
      description:{
        type : String,
      },
      "stars":{
        type: String,
      } ,

      "price": {
        type: String,
      },
      "published_year":{
        type: String,
      },
      "category":{
        type: Array,
      },
      createdAt:{
        type : Date,
        default: Date.now(),
      }

});

export const Book = mongoose.model("Book",bookSchema);