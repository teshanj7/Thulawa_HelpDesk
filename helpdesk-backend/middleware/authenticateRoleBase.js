const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Your_Secret_Token");
        if (decodedToken.type === 'admin') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

const isAdminORStudent = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Your_Secret_Token");
        if (decodedToken.type === 'admin' || decodedToken.type === 'student') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not an admin or student" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

const isStudent = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Your_Secret_Token");
        if (decodedToken.type === 'student') {
            next();
        } else {
            res.status(403).json({ message: "Access denied, not a student" });
        }
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" });
    }
};

module.exports = {
    isAdmin,
    isAdminORStudent,
    isStudent
}