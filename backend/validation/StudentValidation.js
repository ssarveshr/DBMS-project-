import { isEmpty } from './isEmpty'
import validator from './StudentValidation'


const ValidateStudentData = (DATA) => {
    const errors = {}

    DATA.name = !isEmpty(DATA.name) ? DATA.name :''
    DATA.email = !isEmpty(DATA.email) ? DATA.email :''
    DATA.password = !isEmpty(DATA.password) ? DATA.password :''

    if(validator.isEmpty(DATA.name)){
        errors.name = 'Name field is required'
    }
    if(validator.isEmpty(DATA.email)){
        errors.email = 'Email field is required'
    }
    if(validator.isEmpty(DATA.password)){
        errors.email = 'Password field is required'
    }
    if(validator.isLength(DATA.password,{min : 2 , max : 15})){
        errors.password = 'Password must be between 2 and 15 only'
    }
    if(validator.isEmail(DATA.email)){
        errors.email = 'Enter an valid email ID '
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}


export default ValidateStudentData;