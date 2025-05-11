import express from 'express';
import Event from '../../models/events.js';


const Public = express.Router()


// Get request to display all the events 
//* Public router
Public.get('/events', (req, res) => {

	Event.find()
		.then((result) => {
			return res.status(200).json(result)
		})
		.catch(error => {
			console.log(error)
			return res.status(404).json(error)
		})

})


// Get request to display an event by its Id 
//* Public router
Public.get('/events/:id', (req, res) => {
	const id = req.params.id

	Event.findById(id)
		.then((result) => {
			return res.status(200).json(result)
		})
		.catch(error => {
			console.log(error)
			return res.status(404).json(error)
		})
})



export default Public;