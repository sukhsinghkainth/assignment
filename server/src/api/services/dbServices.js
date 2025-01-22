const models = {
    students: require('../../models/student_data.json')
}

const findOne = (modelName, { where }) => {
    const model = models[modelName]
    if (!model) throw new Error(`Model ${modelName} is not Found`)
    const data = model.find((item) => {
        return Object.entries(where).every(([key, value]) => item[key] === value);
    });
    return data || null;
}

const findAll = (modelName, { where = {}, attributes = [], limit = null, offset = null }) => {
    const model = models[modelName]
    if (!model) throw new Error(`Model ${modelName} is not Found`)
    let result = []
    result = model.filter((item) => {
        return Object.entries(where).every(([key, value]) => {
            if (value?.$like) {
                return item[key].toLowerCase().includes(value.$like.toLowerCase())
            } else {
                return item[key] == value
            }
        });
    });
    if (attributes.length > 0) {
        result = result.map((item) => {
            const selectedAttributes = {};
            attributes.forEach(attr => {
                if (item.hasOwnProperty(attr)) {
                    selectedAttributes[attr] = item[attr];
                }
            });
            return selectedAttributes;
        });
    }


    if (offset && limit) {
        offset = parseInt(offset)
        limit = parseInt(limit)
        const start = (offset - 1) * limit;
        const end = start + limit;
        result = result.slice(start, end)
    }
    return result
}

module.exports = {
    findOne,
    findAll
}