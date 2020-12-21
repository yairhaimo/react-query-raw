let counter = 0;

export default (req, res) => {
  res.statusCode = 200
  setTimeout(() => {
    res.json({data: counter++});
  }, 3000);
}
