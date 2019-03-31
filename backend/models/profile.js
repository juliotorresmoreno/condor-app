

const l18n = require('../l18n');

const validations = {
    name: /^([a-zA-Z]{3,}\s?){1,5}$/,
    lastname: /^([a-zA-Z]{3,}\s?){1,5}$/,
    phone: /./,
    description: /./
}

const validate = function (user = {}) {
    let error = new UserError();
    if (!validations.name.test(user.name || '')) {
        error.$name = l18n.error_name_is_invalid;
        error.$length++;
    }
    if (!validations.lastname.test(user.lastname || '')) {
        error.$lastname = l18n.error_lastname_is_invalid;
        error.$length++;
    }
    if (!validations.phone.test(user.phone || '')) {
        error.$name = l18n.error_phone_is_invalid;
        error.$length++;
    }
    if (!validations.description.test(user.description || '')) {
        error.$lastname = l18n.error_description_is_invalid;
        error.$length++;
    }

    return error;
}