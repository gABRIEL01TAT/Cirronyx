const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
    if (!token) {
        return res.status(403).send('Token is required for authentication');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;