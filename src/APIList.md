# API Routes

## AuthRoutes
 - POST/signup
 - POST/login
 - POST/logout

## ProfileRoutes
 - GET/profile/view
 - PATCH/profile/edit
 - PATCH/profile/password -homework

## connectionRequestsRoutes
 - POST/request/send/intrested/:userId
 - POST/request/send/ignored/:userId  
 - for making to dynamic route as (POST/request/send/:status/:userId)

 - POST/request/review/accepted/:requestId
 - POST/request/review/rejected/:requestId 
 - for making to dynamic route as (POST/request/review/:status/:userId)

## userRoutes
 - GET/user/connections
 - GET/user/requests/received
 - GET/user/feed  - gets you the profiles of user in the platform

 status - ignore, intrested, accepted, rejected