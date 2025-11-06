import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user?.admin) {
            next();
        }
        else {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
    });
};
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => next());
};
//# sourceMappingURL=authMiddleware.js.map