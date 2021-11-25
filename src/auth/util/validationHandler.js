import pkg from 'express-validator';
const { validationResult } = pkg;

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("..........................1");
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  next();
}