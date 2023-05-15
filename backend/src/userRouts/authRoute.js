const express = require('express');
let userData = require('../DataModels/userDataModel');
let BooksData = require('../DataModels/userBooksModel');
const cloudinary = require("cloudinary").v2;


// config cloudinary
cloudinary.config({ 
  cloud_name: 'dg3xsxi5b', 
  api_key: '445377114519322', 
  api_secret: '03fLoQEtEVTpZHjHfjwYJuj-rZg' 
});

let userRoute = express();
userRoute.post('/login/user/postBooks',async(req,res)=>{
    try {
        
        const file = req.files;
        console.log(file.bookimg.tempFilePath)
        let bookDetails = {
            user:req.user,
            ...req.body
        };
        // console.log(bookDetails)
        // let db = await BooksData.create(bookDetails);
        
        return res.status(200).json({
            massage:"Given books are stored in Database."
        })
        
    } catch (error) {
        return res.status(400).json({
            massage:"Bookes are not posted on database"
        })
        
    }
});
userRoute.get('/login/user/getBooks',async(req,res)=>{
    try {
        let userId = req.user;
        let books = await userData.find({_id:userId}).populate('Books');
        
        return res.status(200).json({
            massage:"books are...",
            books:books[0].Books
        })
        
    } catch (error) {
        return res.status(400).json({
            massage:"Sorry unable to get books."
        })
        
    }
});
userRoute.put('/login/user/putBooks',async(req,res)=>{
    try {
        console.log("put",req.body)
        let id = req.body._id;
        let upDb = await BooksData.updateOne({_id:id},req.body);
        return res.status(200).json({
            massage:'successfully updated your data'
        }) 
        
    } catch (error) {
        return res.status(400).json({
            massage:"unable to update your books",
            error:error.massage
        })
        
    }
});
userRoute.delete('/login/user/deleteBooks',async(req,res)=>{
    try {
        let id = req.headers.id;
        
        let upDb = await BooksData.deleteOne({_id:id});
        return res.status(200).json({
            massage:'successfully deleted your data'
        }) 
        
    } catch (error) {
        return res.status(400).json({
            massage:"unable to update your books",
            error:error.massage
        })
        
    }
})

module.exports = userRoute;