'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1547778980871_4672';

    // add your config here
    config.middleware = [];

    // 线上环境此处替换为项目根域名 例如 blog.seosiwei.com
    config.host = '127.0.0.1';

    config.port = 18888;

    // 用于安全校验和回调域名根路径 开发路径域名（必填）
    config.origin = `http://${config.host}:${config.port}`;

    // 集群配置（一般默认即可）
    config.cluster = {
        listen: {
            port: config.port,
            hostname: '127.0.0.1',
        },
    };

    // 用户密码加盐随机值
    config.user_pwd_salt_addition = 'ZANEHELLOBEAUTIFUL';

    // 用户登录态持续时间 1 天
    config.user_login_timeout = 86400;

    config.pageSize = 50;

    config.email = {
        client: {
            // service: '163',
            host: 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user: 'xxxxxx@163.com',
                pass: 'xxxxxx',
            },
        },
    };

    exports.io = {
        init: {
            transports: [ 'polling', 'websocket' ],
            allowUpgrades: true,
        },
        namespace: {
            '/socket': {
                connectionMiddleware: [],
                packetMiddleware: [],
            },
        },
    };

    config.view = {
        defaultExtension: '.html',
        mapping: {
            '.html': 'ejs',
        },
    };

    config.ejs = {
        layout: 'layout.html',
    };

    exports.logger = {
        dir: path.resolve(__dirname, '../buildlogs'),
    };

    config.bodyParser = {
        jsonLimit: '1mb',
        formLimit: '1mb',
    };

    config.security = {
        csrf: {
            enable: true,
            // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
            headerName: 'x-csrf-token',
        },
    };

    // redis配置
    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: '',
            db: 0,
        },
    };

    // mongodb configs
    exports.mongoose = {
        url: 'mongodb://127.0.0.1:27017/APubPlat',
        options: {
            autoReconnect: true,
            poolSize: 5,
        },
    };

    config.cors = {
        origin: config.origin,
        allowMethods: 'GET,PUT,POST,DELETE',
    };

    config.onerror = {
        all(err, ctx) {
            // 统一错误处理
            ctx.body = JSON.stringify({
                code: 1001,
                desc: err.toString().replace('Error: ', ''),
            });
            ctx.status = 200;
            // 统一错误日志记录
            ctx.logger.info(`统一错误日志：发现了错误${err}`);
        },
    };

    return config;
};
