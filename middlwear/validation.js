const dataMethod = ['body', 'params', 'query']
const validation = (schema) => {
    return (req, res, next) => {
        const validationErrorArr = []
        dataMethod.forEach(key => {
            if (schema[key]) {
                const validationResult = schema[key].validate(req[key], { abortEarly: false })
                // const validationResult = schema[key].validate(req[key])
                if (validationResult.error) {
                    validationErrorArr.push(validationResult.error.details)
                }
            }
        })
        if (validationErrorArr.length) {
            res.json({ message: "validation error", err: validationErrorArr })
        } else {
            next()
        }
    }
}


module.exports = validation