const SUCCESS = 200;
const FAIL = 404;
const URLPATH = process.env.NODE_ENV === 'production'?'http://121.5.222.6:7001':'http://localhost:7001';
export {
    SUCCESS,
    FAIL,
    URLPATH
}