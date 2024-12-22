# API Routes

## AuthRoutes
 - POST/signup
 - POST/login
 - POST/logout

## ProfileRoutes
 - GET/profile/view
 - PATCH/profile/edit
 - PATCH/profile/password

## connectionRequestsRoutes
 - POST/request/send/intrested/:userId
 - POST/request/send/ignored/:userId
 - POST/request/review/accepted/:requestId
 - POST/request/review/rejected/:requestId

## userRoutes
 - GET/user/connections
 - GET/user/Requests
 - GET/user/feed  - gets you the profiles of user in the platform

 status - ignore, intrested, accepted, rejected