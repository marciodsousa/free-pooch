const express = require('express');
const router = express.Router();
const parkController = require('../controllers/parkController');
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(parkController.getParks));
router.get('/parks', catchErrors(parkController.getParks));
router.get('/parks/:id/edit', catchErrors(parkController.editPark));

router.get('/add', parkController.addPark);

router.post('/add', catchErrors(parkController.createPark));

router.post('/add/:id', catchErrors(parkController.updatePark));

// router.get('/reverse/:name', (req,res) => {
//   const reverse = [...req.params.name].reverse().join('');
//   res.json(reverse);
// });
module.exports = router;