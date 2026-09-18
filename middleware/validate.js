const validator = require('../helpers/validate');

const saveArtist = (req, res, next) => {
    const validationRule = {
        fname: 'required|string',
        mname: 'string',
        lname: 'required|string',
        dob: 'required|string',
        dod: 'string',
        country: 'required|string',
        localArtist: 'required|boolean'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveArtwork = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        artyear: 'required|integer',
        period: 'required|string',
        arttype: 'required|string',
        artfile: 'required|string',
        artistId: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveArtist,
    saveArtwork
};