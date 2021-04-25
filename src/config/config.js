require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const config = {
  default: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT || "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "120.0.0.1",
  },
  development: {
    extend: "default",
    database: process.env.DB_NAME || "tarea2_development",
  },
  test: {
    extend: "default",
    database: "tarea2_test",
  },
  production: {
    dialect: process.env.DB_DIALECT || "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    use_env_variable: "DATABASE_URL",
  },
};

Object.keys(config).forEach((configKey) => {
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = { ...config[configValue.extend], ...configValue };
  }
});

module.exports = config;
