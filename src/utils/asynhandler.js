//wraper for async functions to handle errors
const asyncHandler =(func)=>async (req,res,next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        console.error('Error in asyncHandler:', error);
        res.status(500).json({sucess: false,
             message: 'Internal Server Error' });
    }
}
//OR Another  way to write asyncHandler
// const asyncHandler = (requestHandler) => {
//   return (req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };

export default asyncHandler;
