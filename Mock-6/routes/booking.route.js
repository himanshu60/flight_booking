const express=require("express");
const {bookingModel}=require("../models/booking.model")

const bookRouter=express.Router();

bookRouter.post("/api/booking",async(req,res)=>{
    
    try {
        const data=req.body;
        const book=new bookingModel(data);
        await book.save();
        res.status(201).send("booking data added")
    } catch (error) {
        res.status(201).send(error.message)
    }
})

bookRouter.get("/api/dashboard",async(req,res)=>{
    try {
        const book=await bookingModel.find()
        res.status(200).send(book)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports={
    bookRouter
}