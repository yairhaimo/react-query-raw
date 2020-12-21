const items = [];

export default (req, res) => {
	res.statusCode = 200;
	items.push(`Item ${Math.round(Math.random() * 1e6)}`);
  setTimeout(() => {
    res.json({data: items});
  }, 3000);
};
