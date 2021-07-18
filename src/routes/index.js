const express = require('express');
const router = express.Router();

const Location = require('../models/location');

router.get('/', async (req,res) => {
    const location = await Location.find();
   
    res.render('index',     {
        location 
    });
});

router.post('/add', async(req, res) => {
    const location = new Location(req.body);
    await   location.save();    
    res.redirect('/');
});
router.get('/turn/:id', async(req,res)=> {
    const {id} = req.params;
    const location = await Location.findById(id);
    location.status =!location.status;
    await location.save();
    res.redirect('/');
});

router.get('/edit/:id', async(req,res)=> {
    const {id} = req.params;
    const location = await Location.findById(id);
    res.render('edit', {
        location
    });

router.post('/edit/:id', async(req,res) =>{
    const {id} = req.params;
    await Location.update({_id:id}, req.body);
    res.redirect('/');
})
    
});

router.get('/delete/:id', async(req,res)=> {
    const {id} = req.params;
    await Location.remove({_id:id});
    res.redirect('/');
});

module.exports = router;