const crypto = require('crypto');
module.exports = {
    setPassword(password) {
        Signtrue = crypto.createHmac('sha1', 'lancome');
        Signtrue.update(password);
        let d = Signtrue.digest('hex');
        return d;
    }
}