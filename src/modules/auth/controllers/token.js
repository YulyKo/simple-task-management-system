const jwt = require('jsonwebtoken');

function generateAccessToken(username, refreshtoken) {
  return jwt.sign(username, refreshtoken);
}

function generateRefreshToken() {
  return require('crypto').randomBytes(64).toString('hex');
}

function apiGetTokens(req, res) {
  const refreshtoken = generateRefreshToken();
  const response = {
    accessToken: generateAccessToken(req.body.username, refreshtoken),
    refreshToken: refreshtoken,
  };
  res.json(response);
}

module.exports = {
  apiGetTokens,
};
