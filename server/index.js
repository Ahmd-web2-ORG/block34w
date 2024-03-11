const { client,
    createTables,
    createUser,
    createPlace,
    fetchPlaces,
    fetchUsers,
    createReservation,
    destroyReservation } = require('./db');
const express = require('express');
const app = express();
app.use(express.json())

app.get('/api/users', async (req, res, next) => {
    try {
        res.send(await fetchUsers());
    }
    catch (ex) {
        next(ex);
    }
});

app.get('/api/places', async (req, res, next) => {
    try {
        res.send(await fetchPlaces());
    }
    catch (ex) {
        next(ex);
    }
});

app.get('/api/reservation', async (req, res, next) => {
    try {
        res.send(await fetchReservation());
    }
    catch (ex) {
        next(ex);
    }
});

app.delete('/api/reservation/:id', async(req, res, next)=> {
    try {
      await destroyReservation(req.params.id);
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });
  app.post('/api/reservation', async(req, res, next)=> {
    try {
    console.log(req.body)
    
      res.status(201).send(await createReservation(req.body.place_name, req.body.user_name, req.body.departure_date));
    }
    catch(ex){
      next(ex);
    }
  });
         



const init = async () => {
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('tables created');
    const [ndj, jed, ruh, rome, nyc, cmh, dmm] = await Promise.all([
        createUser('ndj'),
        createUser('jed'),
        createUser('ruh'),
        createPlace('roma'),
        createPlace('nyc'),
        createPlace('cmh'),
        createPlace('Dmm')
    ]);
    console.log(`moe has an id of ${moe.id}`);
    console.log(`rome has an id of ${rome.id}`);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

init()