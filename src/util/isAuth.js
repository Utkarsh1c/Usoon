//requiring jason web token module
import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const authHeader = req.get('Authorization');
    //check for presence of authheader received from client
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    
    //deriving token from bearer token
    const token = authHeader.split(' ')[1];

    let decodedToken;
    //verifying integrity of token
    try {
        decodedToken = jwt.verify(token, 'supersecret');
    } 
    catch (err) {
        err = new Error('Not authenticated.');
        err.statusCode = 401;
        throw err;
    }

    req.userId = decodedToken.data.id;
    req.username = decodedToken.data.username;

    next();
};

