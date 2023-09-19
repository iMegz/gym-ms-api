const cors = require("cors");

module.exports = () => {
    const origin = process.env.ORIGIN | "*";
    return cors({ origin });
};
