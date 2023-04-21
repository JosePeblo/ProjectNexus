const emailRegex = /^[\w-\.]+(@(dispatchhealth))\.(com)|a(\d{8}|\d{9})(@tec)\.(mx)$/;

/**
 * @param {String} email 
 */
exports.emailValidation = (email) => {
    return (email.match(emailRegex))? true : false; 
}