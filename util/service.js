
exports.isEmptyOrNull = (value) => {
    if(value == "" || value == null || value == undefined ){
        return true
    }
    return false
}