const env = {
    database: 'api_vgqi',
    username: 'api_vgqi_user',
    password: 'vgYWC5aDBV3nA9W2pLws4zuQsv5hY0HO',
    host: 'dpg-cr609gjv2p9s73akjung-a.oregon-postgres.render.com',
    port: '5432',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
