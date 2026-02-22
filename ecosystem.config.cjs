module.exports = {
  apps: [
    {
      name: "pro_moto_blog",
      cwd: __dirname,
      script: ".output/server/index.mjs",
      instances: 1,
      watch: false,
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: 8000
      }
    }
  ]
};
