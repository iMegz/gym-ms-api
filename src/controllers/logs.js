/**
 * @typedef {"adminAdd" | "adminRemove" | "sessionNew" | "memberAdd" | "memberRemove" | "memberFreeze" | "memberChangeSub" | "subscriptionAdd" | "subscriptionRemove" | "subscriptionChange" | "subscriptionDeactivate" | "userLogin" | "userChangeInfo" | "logExport" | "logDelete"} LogType
 */

/**
 * Log data
 * @param {LogType} logType
 * @param {any} data
 */
exports.log = async function (logType, ...data) {
    console.log(logType, new Date().toLocaleString());
};
