const validation = (input, type = '', constraint='') => {
    if (!input && constraint == 'NOT_NULL') {
        return "Your entry must contain an input, please try again";
    }
    else if (type == "INT" && isNaN(input)) {
        return 'Your input in invalid, please enter a number'
    }
    else { return true }
};

module.exports =  { validation }