module.exports = {
  apps : [{
    name: '===== NMP Node_JS Server ======',
    script: './api.js',
    watch: true,
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
