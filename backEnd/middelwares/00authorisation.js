const jwt = require("jsonwebtoken");
require ("dotenv").config({ path: "../config/.env"});

module.exports = {
    auth: async (req, res, next) => {
        const bearerToken = req.header('authorization');
        if (!bearerToken) return res.status(401).send('Access denied. No token provided.');

        try {
            if (typeof bearerToken !== 'undefined') {
                const bearer = bearerToken.split(' ');
                const token = bearer[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET
                    );

                req.user = decoded;
                await next();
            }
            else {
                res.status(400).send('Invalid token.');
            }

        }
        catch (err) {
            res.status(400).send('Invalid token.');
        }
    },
    admin: async (req, res, next) => {
        // 401 Unauthorized
        // 403 Forbidden 

        if (!req.user.isAdmin || req.user.role !== 'admin') return res.status(403).send('Access denied.');

        await next();
    }
}
