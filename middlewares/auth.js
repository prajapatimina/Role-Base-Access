const jwt = require('jsonwebtoken')

let isAdmin = function auth(req, res, next) {
    const token = req.header("token")

    if(!token) return res.status(401).send('Access denied. No token provided')

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        if(req.user.role == "admin"){
            next()

        }
        else{
            res.status(400).send('Permission Denied')
        }

    } catch (e) {
        res.status(400).send('Invalid token')
    }
}

let isLoggedin = function auth(req, res, next) {
    const token = req.header("token")

    if(!token) return res.status(401).send('Access denied. No token provided')

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e) {
        res.status(400).send('Invalid token')
    }

}

module.exports={
    isAdmin,isLoggedin
}



// app.use(async (req, res, next) => {
//     if (req.headers["x-access-token"]) {
//       try {
//         const accessToken = req.headers["x-access-token"];
//         const { userId, exp } = await jwt.verify(accessToken, process.env.JWT_SECRET);
//         // If token has expired
//         if (exp < Date.now().valueOf() / 1000) {
//           return res.status(401).json({
//             error: "JWT token has expired, please login to obtain a new one"
//           });
//         }
//         res.locals.loggedInUser = await User.findById(userId);
//         next();
//       } catch (error) {
//         next(error);
//       }
//     } else {
//       next();
//     }
//   });
  