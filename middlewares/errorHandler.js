// backend/middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Server error');
};
