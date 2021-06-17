module.exports = {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'tms-db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'tms-db',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'postgres://hmydgiwxdtzjfb:4dbdc43a52330803dbdc2e3da33476e856c7351b6d32ab7fe7165108dc8b5612@ec2-18-215-111-67.compute-1.amazonaws.com:5432/dflpg73vk4t6pd',
  },
};
