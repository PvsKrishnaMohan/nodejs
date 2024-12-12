// const adminAuth = (req, res,next) => {
//     const auth = "abc123";
//     const isAuthorized = auth === "abc123";

//     if(!isAuthorized) {
//         res.status(401).send("Access denied due to unAuthorization!")
//     }else{
//         console.log("Authentication is checking...");
//         next();
//     }
// }

// const userAuth = (req, res,next)=>{
//     const userAuth = '123abc';
//     const isAuthorized = auth === "123abc";

//     if(!isAuthorized){
//         res.status(401).status('User access is denied due to Authorization!')
//     }else {
//         console.log('User Authorized successfully!');
//         next();
//     }
// }

// module.exports = {
//     adminAuth,
//     userAuth
// }