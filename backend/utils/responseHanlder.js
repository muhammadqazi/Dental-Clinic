function responseHanlder(res, statusCode, status, message, data, id) {
    res.status(statusCode).json({
        status: status,
        message: message,
        data: data,
        insertId: id
    });
}

module.exports = responseHanlder;