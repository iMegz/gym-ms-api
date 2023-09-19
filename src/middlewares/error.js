module.exports = (err, req, res, next) => {
    console.log(err);
    const msg = err.msg || "Server error";
    const status = err.status || 500;
    const data = err.data || [];
    res.status(status).json({ msg, data });
};
