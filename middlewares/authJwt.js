// middlewares/authJwt.js
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.userId;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const role = await Role.findByPk(user.roleId); // Или user.role_id, в зависимости от вашей модели
        if (role && role.name === "admin") {
            return next();
        }
        return res.status(403).send({ message: "Require Admin Role!" });
    } catch (error) {
        return res.status(500).send({ message: "Unable to validate Role!" });
    }
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;
