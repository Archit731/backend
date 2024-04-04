const asyncHandler =(requestHandler) => {
    (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}


export {asyncHandler}


//try catch type
// const asyncHandler = (fn) => async () => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,              //as u can see all these error messages are upto us so to standardise what to send and all we made ApiError.js
//             message: error.message
//         })
//     }
// }