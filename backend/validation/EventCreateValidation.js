import { isEmpty } from './isEmpty.js'
import validator from 'validator'

const EventcreateValidation = (DATA) => {
    const errors = {}

    DATA.title = !isEmpty(DATA.title) ? DATA.title : ''
    DATA.description = !isEmpty(DATA.desc) ? DATA.desc : ''
    DATA.location = !isEmpty(DATA.loca) ? DATA.loca : ''
    DATA.faculty = !isEmpty(DATA.faculty) ? DATA.faculty : ''


    if (validator.isEmpty(DATA.title)) {
        errors.title = 'Email field is required'
    }
    if (!validator.isLength(DATA.title, { min: 4, max: 20 })) {
        errors.lengthtitle = 'Title should be between 4 and 20 charecter'
    }
    if (validator.isEmpty(DATA.desc)) {
        errors.desc = 'Password field is required'
    }
    if (!validator.isLength(DATA.desc, { min: 10, max: 100 })) {
        errors.lengthDesc = 'Title should be between 10 and 100 charecter'
    }
    if (validator.isEmpty(DATA.loca)) {
        errors.loca = 'Password field is required'
    }
    if (validator.isEmpty(DATA.faculty)) {
        errors.faculty = 'Password field is required'
    }

    return {
        errors,
        valid: 'successfull',
        isValid: isEmpty(errors)
    }
}


export default EventcreateValidation;