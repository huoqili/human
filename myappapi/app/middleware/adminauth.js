const url = require('url');
module.exports = options => {
    return async function index(ctx, next) {
        // 调用url模块解析路径
        let path = url.parse(ctx.url).pathname;
        let {SUCCESS, FAIL} = ctx.app.config.code;
        // 如果路径为login，放行
        if (path === '/admin/login' || path === '/admin/upload') {
            await next();
        } else {
            // 需要验证token，请求头header中
            let token = ctx.request.header.token;
            if (token) {
                let {app} = ctx;
                try {
                    let payload = app.jwt.verify(token, app.config.jwt.secret);
                    if (payload) {
                        ctx.id = payload.id;
                        await next();
                    }
                } catch (err) {
                    ctx.body = {
                        code: FAIL,
                        msg: 'token异常'
                    }
                    console.log(err);
                    return;
                }
            } else {
                ctx.body = {
                    code: FAIL,
                    msg: 'token不能为空'
                }
                return;
            }
        }
    }
}