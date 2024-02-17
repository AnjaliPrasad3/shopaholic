export default (err, req, res, next) => {
    let error = { 
        statusCode:err?.message || 500,
        message:err?.message || "Internal Server Error",
    };

    res.status(error.statusCode).json({
        message:error.message,
    });
};