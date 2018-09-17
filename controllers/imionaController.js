var imiona = require('../models/imiona');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

exports.index = function(req, res) {
    //res.send('NOT IMPLEMENTED: Site Home Page');
    async.parallel({
        imiona_count: function(callback) {
            imiona.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    }, function(err, results) {
        res.render('index', { title: 'HerokuGov Home', error: err, data: results });
    });
};

// Display list of all Names.
exports.imiona_list = function(req, res, next) 
{
  imiona.find()//, 'title author')
    .exec(function (err, lista_imion) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('imiona_list', { title: 'Lista imion', imiona_list: lista_imion });
    });
    
};


// Display Author create form on GET.
exports.imiona_create_get = function(req, res, next) { 
    res.render('imiona_form', { title: 'Wprowadź imię'});
};

// Handle Author create on POST.
exports.imiona_create_post = [
    // Validate fields.
    body('Rok').isLength({ min: 4 }).trim().withMessage('Rok must be specified.')
        .isAlphanumeric().withMessage('Rok has non-alphanumeric characters.'),
    body('Imię').isLength({ min: 1 }).trim().withMessage('Imię must be specified.')
        .isAlphanumeric().withMessage('Imię has non-alphanumeric characters.'),
    body('Płeć').isLength({ min: 1, max: 1}).trim().withMessage('Płeć must be specified.')
        .isAlphanumeric().withMessage('Płeć has non-alphanumeric characters.'),
    body('Liczba').isLength({ min: 1}).trim().withMessage('Liczba must be specified.')
        .isAlphanumeric().withMessage('Liczba has non-alphanumeric characters.'),

    // Sanitize fields.
    sanitizeBody('Rok').trim().escape(),
    sanitizeBody('Imię').trim().escape(),
    sanitizeBody('Płeć').trim().escape(),
    sanitizeBody('Liczba').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('imiona_form', { title: 'Wprowadź imię', imiona: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var imie = new imiona(
                {
                    Rok: req.body.Rok,
                    Imię: req.body.Imię,
                    Płeć: req.body.Płeć,
                    Liczba: req.body.Liczba
                });
            imie.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.render('imiona_form', {title: 'Wprowadź imię', end: 'Wprowadzono imię'});
            });
        }
    }
];


// Display Author delete form on GET.
exports.imiona_delete_get = function(req, res, next) 
{
	res.render('imiona_form_delete', { title: 'Wprowadź ID imienia'});
};

// Handle Author delete on POST.
exports.imiona_delete_post = function(req, res, next) 
{
    async.parallel({
        author: function(callback) {
          imiona.findById(req.body.imieID).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        //  Delete object and redirect to the list of authors.
        imiona.findByIdAndRemove(req.body.imieID, function deleteImie(err) {
            if (err) { return next(err); }
            // Success - go to author list
            res.render('imiona_form_delete', {title: 'Wprowadź ID imienia', end: 'Usunięto imię'});
        })       
    });
};

// Display Author update form on GET.
exports.imiona_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Imiona update GET');
};

// Handle Author update on POST.
exports.imiona_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Imiona update POST');
};
