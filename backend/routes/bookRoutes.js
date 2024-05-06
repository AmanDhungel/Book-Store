import express from 'express';
import { Book } from '../models/bookModal.js';
const router = express.Router();

router.post('/',async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
          return  res.status(400).send({
                message: 'Please enter All the fields'
            });
        }
    
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear,
        };
    
        const book = await Book.create(newBook);
    
        return res.status(201).send(book);
     
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
    })
    
        router.get('/', async(req, res)=>{
       try {
        const book = await Book.find({});
    
        return res.status(200).json({
            count: book.length,
            books: book});
       } catch (error) {
        console.log(err.message);
        res.status(500).send({message: error.message});
       }
    })
    
    router.get('/:id', async(req, res)=>{
       try {
        const {id} = req.params;
        const books = await Book.findById(id);
    
        return res.status(200).json(books);
       } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
       }
    })
    
    router.put('/:id', async(req, res)=>{
       try {
        if(!req.body.title || !req.body.author || !req.body.publishedYear){
            return  res.status(400).send({
                  message: 'Please enter All the fields'
              });
          }
      
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
    
        if(!result){
            return response.status(404).send('ID not found');
        }
        return res.status(200).json({
            message: 'updated Successfully'
        });
       } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
       }
    })
    
    router.delete('/:id', async(req, res)=>{
       try {
           const { id } = req.params;
           const result = await Book.findByIdAndDelete(id);
           if(!id){
               return res.status(404).send('ID not found');
           }
           return res.status(200).json({
               message: 'deleted Successfully'
           });
       } catch (error) {
            console.log(error);
            res.status(500).send({message: error.message});
       }
    })
    

    export default router;