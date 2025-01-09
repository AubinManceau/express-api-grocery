import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try{
        let token = req.header("Authorization");
        if (!token) {
            throw new Error("Authentication failed");
        }
        token = token.replace("Bearer ", "");
        const decoded = jwt.verify(token, 'RANDOM_TOKEN');
        if (!decoded) {
            throw new Error("Authentication failed");
        }
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json(error.message)
    }
}

export default auth