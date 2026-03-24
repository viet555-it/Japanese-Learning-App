import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    // Header format: Bearer <TOKEN>
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret_access_key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired access token" });
        }
        
        req.user = user;
        next();
    });
};
