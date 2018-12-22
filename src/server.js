const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express()
const models = require('./models/index');
app.set('view engine','pug');
app.set('views', path.join(__dirname,'/views'));
// Decode json and x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Add a bit of logging
app.use(morgan('short'))

app.get('/', function(req, res) {
  res.render('index',{
	  title: "Henri Vinay",
	  message: "Monkey Manager"
  })
})


//////////////////////////////////////////////////////////////////////////
// monkeys
//CREATE
app.post('/create_monkey', function(req, res) {
  models.Monkey.create({
    name: req.body.name,
	weight: req.body.weight,
	color: req.body.color,
	nomenclos: req.body.nomenclos
  })
    .then(() => {
      res.render('pug_monkey_created');
    })
})

app.get('/pug_create_monkey', function (req, res) {
    res.render('pug_create_monkey');
})

//VIEW
app.get('/pug_view_monkey', function (req, res) {
  models.Monkey.findAll()
    .then((monkeys) => {
      res.json(monkeys)
    })
	.catch((err) => {
	  res.json(err)
	})
})


app.get('/view_monkey/:id', function (req, res) {
  models.Monkey.findOne({
	  id: req.params.id
  })
    .then((monkeys) => {
      res.json(monkeys)
    })
	.catch((err) => {
	  res.json(err)
	})
})

app.put('/monkey/:id', function (req, res) {
  models.Monkey.update(
	  req.body,
	  {
	  where: {
	  id: req.params.id
	  }
  })
    .then((monkeys) => {
      res.json(monkeys)
    })
	.catch((err) => {
	  res.json(err)
	})
})

//DELETE
app.delete('/delete_monkey/:id', function (req,res) {
	models.Monkey.destroy({
		where: {
	  id: req.params.id
	  }
	  })
	  .then((response) => {
      res.json(response)
    })
	.catch((err) => {
	  res.json(err)
	})
})

app.put('/monkey', function (req, res) {
	const promises = [];
	
	req.body.mutations
		.forEach((item) =>{
			promises.push(
				models.Monkey.update(
					item.data,
					{
						where :{ id :item.id}
					}
				)	
			)
		})
		
		Promise.all(promises)
			.then((response) => {
				res.json(response);
			})
			.catch((err) => {
				res.json(err)
			})
})

app.delete('/delete_monkey', function (req, res) {
	models.Monkey.destroy ({
		where :{name: req.body.name}
	})
	.then((response) => {
		res.json(response)
	})
	.catch((err) => {
	  res.json(err)
	})
})

app.get('/pug_delete_monkey', function (req, res) {
    res.render('pug_delete_monkey');
})



/////////////////////////////////////////

/*chercher un singe dans un enclos:
localhost:3000/monkey?nomenclos=
*/

app.get('/monkey', function (req, res) {
  console.log(req.query)
  models.Monkey.findAll({
	where : req.query
	})
    .then((monkeys) => {
      res.json(monkeys)
    })
	.catch((err) => {
	  res.json(err)
	})
})


///////////////////////////////////////////////////////////////////////////////
//enclos

app.post('/enclos', function(req, res) {
  models.Enclos.create({
    name: req.body.name
  })
    .then(() => {
      res.send('enclos added !')
    })
	.catch((err) => {
	  res.json(err)
	})
})

app.get('/enclos', function (req, res) {
  models.Enclos.findAll()
    .then((enclos) => {
      res.json(enclos)
    })
	.catch((err) => {
	  res.json(err)
	})
})


app.get('/enclos/:id', function (req, res) {
  models.Enclos.findOne({
	  id: req.params.id
  })
    .then((enclos) => {
      res.json(enclos)
    })
	.catch((err) => {
	  res.json(err)
	})
})

app.put('/enclos/:id', function (req, res) {
  models.Enclos.update(
	  req.body,
	  {
	  where: {
	  id: req.params.id
	  }
  })
    .then((enclos) => {
      res.json(enclos)
    })
	.catch((err) => {
	  res.json(err)
	})
})


app.delete('/enclos/:id', function (req,res) {
	models.Enclos.destroy({
		where: {
	  id: req.params.id
	  }
	  })
	  .then((response) => {
      res.json(response)
    })
	.catch((err) => {
	  res.json(err)
	})
})

app.put('/enclos', function (req, res) {
	const promises = [];
	
	req.body.mutations
		.forEach((item) =>{
			promises.push(
				models.Enclos.update(
					item.data,
					{
						where :{ id :item.id}
					}
				)	
			)
		})
		
		Promise.all(promises)
			.then((response) => {
				res.json(response);
			})
			.catch((err) => {
				res.json(err)
			})
})

app.delete('/enclos', function (req, res) {
	models.Enclos.destroy ({
		where :{ id :req.body.ids}
	})
	.then((response) => {
		res.json(response)
	})
	.catch((err) => {
	  res.json(err)
	})
})




// Synchronize models
models.sequelize.sync().then(function() {
  /**
   * Listen on provided port, on all network interfaces.
   * 
   * Listen only when database connection is sucessfull
   */
  app.listen(3000, function() {
    console.log('Express server listening on port 3000');
  });
});
