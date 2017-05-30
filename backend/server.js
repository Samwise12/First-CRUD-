import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
/////express
const app = express();
app.use(bodyParser.json())
/////mongodb
const dbUrl = 'mongodb://localhost:27017/crudwithredux';

function validate(data) {
	let errors = {};		
		if (data.title === '') errors.title = "Can't be empty"
		if (data.cover === '') errors.cover = "Can't be empty"
		const isValid = Object.keys(errors).length === 0
		return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err,db){  
  if(err){console.log('unable to connect to server')}
  else{console.log('connected to mongodb')}; 

app.get('/api/games',(req,res) => {
  db.collection('games').find({}).toArray((err, games) => {
    res.json({ games });
  });
});

app.put('/api/games/:_id', (req,res) => {
	const { errors, isValid } = validate(req.body);
	if (isValid) {
		const { title, cover } = req.body;
		db.collection('games').findOneAndUpdate(
		{ _id: new mongodb.ObjectId(req.params._id) },
		{ $set: { title, cover } },
		{ returnOriginal: false },
		(err, result) => {
			if (err) { res.status(500).json({ errors: { global: err}}); return; }
			res.json({ game: result.value });
		}
			);
		  } else {
		res.status(400).json({ errors });
	}
});

app.get('/api/games/:_id', (req, res) => {
	db.collection('games').findOne({ _id: new mongodb.ObjectId(req.params._id)}, (err, game) => {
		res.json({ game });
	})
});

app.delete('/api/games/:_id', (req,res) => {
	db.collection('games').deleteOne({ _id: new mongodb.ObjectId(req.params._id)}, (err,r) => {
		if (err) { res.status(500).json({ errors: { global: err}}); return;}
		res.json({});
	})
});

app.post('/api/games', (req,res) => {
const { errors, isValid } = validate(req.body);
if(isValid){
	const { title, cover } = req.body;
	db.collection('games').insert({ title, cover }, (err, result) => {
		if(err) {
			res.status(500).json({ errors: { global: "Something went wrong"}});
		} else {
			res.json({ game: result.ops[0] })
		}
	})
} else{
	res.status(400).json({ errors })
}	

});

app.use((req,res) => {
	res.status(404).json({
		errors: {
			global: "Still working on it."
		}
	})
})

app.listen(8080,function(){
  console.log('listening on 8080')
})
  
});//end mongodb.MongoClient


