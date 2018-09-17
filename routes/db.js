var express = require('express');
var router = express.Router();

// Require controller modules.
var imiona_controller = require('../controllers/imionaController');

// GET catalog home page.
router.get('/', imiona_controller.index);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display imiona).
router.get('/imiona/create', imiona_controller.imiona_create_get);

// POST request for creating Author.
router.post('/imiona/create', imiona_controller.imiona_create_post);

// GET request to delete Author.
router.get('/imiona/delete', imiona_controller.imiona_delete_get);

// POST request to delete Author.
router.post('/imiona/delete', imiona_controller.imiona_delete_post);

// GET request to update Author.
router.get('/imiona/:id/update', imiona_controller.imiona_update_get);

// POST request to update Author.
router.post('/imiona/:id/update', imiona_controller.imiona_update_post);

// GET request for list of all Authors.
router.get('/imiona', imiona_controller.imiona_list);



module.exports = router;