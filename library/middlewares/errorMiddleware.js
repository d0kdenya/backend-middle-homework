module.exports = (req, res) => {
  res.status(404)
  res.json({
    'errCode': 404,
    'errMsg': 'Страница не найдена!'
  })
}