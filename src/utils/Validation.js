import React, { useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';

const nameReg = /^[a-zа-яё\s]+$/iu;

export default function useForm() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });

        if (name === 'email') {
            !isEmail(value) && !errors[name]
                ? setErrors({
                      ...errors,
                      [name]: 'Какой-то неправильный Email',
                  })
                : setErrors({
                      ...errors,
                      [name]: target.validationMessage,
                  });

            setIsValid(
                target.closest('form').checkValidity() && isEmail(value)
            );
        } else if (name === 'name') {
            !nameReg.test(value) && value.length > 0
                ? setErrors({
                      ...errors,
                      [name]: 'Только кириллица, латиница, пробел, дефис',
                  })
                : setErrors({
                      ...errors,
                      [name]: target.validationMessage,
                  });

            setIsValid(
                target.closest('form').checkValidity() &&
                    nameReg.test(value)
            );
        } else {
            setIsValid(target.closest('form').checkValidity());
        }
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm };
}
