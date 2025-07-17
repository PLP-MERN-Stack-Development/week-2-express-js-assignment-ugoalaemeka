module.exports = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || typeof name !== 'string' || !price || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  next();
};
