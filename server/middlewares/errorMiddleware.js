//server/middlewares/errorMiddleware.js

// Middleware para manejar y responder a errores en la aplicación
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  };

  
  
  export default errorHandler;
  