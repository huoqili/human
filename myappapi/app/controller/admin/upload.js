'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
class UploadController extends Controller {
    async upload() {
        let { ctx, app } = this;
        let { FAIL, SUCCESS } = app.config.code;
        // 接受文件
        const stream = await ctx.getFileStream();
        try {
            
            // 移动文件
            let baseDir = 'app/public/upload/img';
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let date1 = date.getDate();
            let timeJoin = '/' + year + month + date1;
            let uploaddir = baseDir + timeJoin;
            let timeStamp = date.getTime();
            let randomNumber = Math.round(Math.random() * 1000);
            let extname = path.extname(stream.filename);
            let filename = '/' + timeStamp + randomNumber + extname;
            if (!fs.existsSync(uploaddir)) {
                fs.mkdirSync(uploaddir, { recursive: true });
            }
            uploaddir += filename;
            let urlpath = '/public/upload/img' + timeJoin + filename;
            const writeStream = fs.createWriteStream(uploaddir);
            stream.pipe(writeStream);
            ctx.body = {
                code: SUCCESS,
                msg: '文件上传成功',
                url: urlpath
            }
        } catch (err) {
            await sendToWormhole(stream);
            ctx.body = {
                code: FAIL,
                msg: '文件上传失败'
            }
        }

    }
}

module.exports = UploadController;
