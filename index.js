const express  = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const logger = require('./logger');
const app = express();
const projectSchema = require('./model.js');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => {console.log(error)});
db.once('open', ()=> console.log("Database connected"));

app.use(express.json())

app.get('/', async(req, res) => {
	res.send("get here")
})

//getById middalware
async function getById(req, res, next) {
	let IDs;
	try{
		IDs = await projectSchema.findById(req.params.id);
		res.Ids = IDs;
	} catch (err){
		res.Ids = {massage: "Id not found"};
	}
	next();
}

//Read and find
app.get('/read', async (req, res) => {
	//if you didn't mention find object than we will simply return raw Data without finding anything in Database
	if(req.body.find == undefined) {
	// 	// const valWith = 
		res.json({data: await projectSchema.find({})})

	}
	try {
			const find = await projectSchema.find({$text: { $search: req.body.find }})	
			if (find.length == 0) {
				const find =  await projectSchema.find({$or: [{ name: { $regex: req.body.find, $options: "i" }}]}).then((val, index) => {
					if (val.length === 0) {
						return res.status(404).json({message: "Can't find"})
					} else {
						return res.status(201).json({data: val})
					}
				})
			} else {
				  res.status(201).json({data: find})
			}
	} catch (e) {
		 logger.error(`${e.message}`);
		 res.status(500).json({message: "Error"})
	}
})

//Get By id
app.get('/:id', getById, async (req, res) => {
	if(res.Ids == null){
			logger.error("Can't find ID");
			return res.send({message: "Can't find ID"});
	}
	res.json(res.Ids);
})

//Create One 
app.post('/insert', async (req, res)=> {
	const name = req.body.name;
	const img = req.body.img;
	const summary = req.body.summary;

	const project = new projectSchema({
		name,
		img,
		summary
	})
	
	try{

		if(img.startsWith("http://") || img.startsWith("https://")) {
		  const projectSave = await project.save()
		  return res.json(projectSave)
	  }

	  if(!img.startsWith("https://") || !img.startsWith("http://")) {
			logger.error("Invalid Image URL");
			return res.json({message: "Invalid Image URL"})
		}

	}catch(e){
		// console.log(err);
		logger.error(`${e.message}`);
		res.status(500).json({messages: "Error"});
	}
})

//Create Many
// SEND DATA IN THIS FORMAT 

app.post('/insertMany', async(req, res) => {
	try{
	   const projectSave = await projectSchema.insertMany(req.body.insertMany);
	   res.json(projectSave)
	}catch(err){
		 logger.error(`${err.message}`);
	   res.status(500).json({Message : "Insert Correct Response"})
	}
})


//Update
// SEND DATA IN THIS FORMAT WITH ID IN URL

app.post('/update/:id', getById, async (req, res)=>{
	try{
			if(res.Ids == null || res.Ids._id == undefined) {
				 res.send({message: "Incorrect ID"})
			}
			const img = req.body.img;
			if(img.startsWith("http://") || img.startsWith("https://")) {
				const UpdatedData = await projectSchema.updateOne({_id:`${req.params.id}`}, { $set: req.body });
	    	const findByID = await axios.get(`http://localhost:3000/${req.params.id}`);
	    	// console.log(findByID.data)
	    	 res.json(findByID.data);
			}
			if(!img.startsWith("http://") || !img.startsWith("https://")) {
				logger.error("Invalid Image URL");
				 res.json({message: "Invalid Image URL"})
			}		
	}catch(err){
		logger.error(`${err.message}`);
	}
})


//Delete
// SEND id of document in following url "/delete/<--ID-->"

app.post('/delete/:id', getById, async (req, res)=>{
	if(res.Ids == null || res.Ids._id == undefined) res.send({message: "Incorrect ID"})

	const deleteId = req.params.id;
	try{
	   const Deleted = await projectSchema.deleteMany({_id:deleteId})
	   res.send(Deleted);
	}catch(err){
		res.status(500).json({message: "Error"})
	}
})


//delete Many 
// 				=> give array of ids in deleteManyById object in body

app.post('/deleteManyById', async (req, res) => {
	const id = req.body.deleteManyById
	try {
		const manyDelete = await projectSchema.deleteMany({
														    "_id": {
														        "$in": id
														        }
														 }) 
		res.status(201).json(manyDelete)
	} catch (e) {
		res.status(500).json({message: "Error"})
	}
})


//server started
app.listen(process.env.PORT, ()=> {
	console.log("Server Started!!");
})