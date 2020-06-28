const lang = {
    boats: {
        typeName: {
            zero: 'båter',
            one: 'båt',
            multiple: 'båter'

        }
    },
    cars: {
        typeName: {
            zero: 'biler',
            one: 'bil',
            multiple: 'biler'
        }
    },
    other: {
        typeName: {
            zero: 'enheter',
            one: 'enhet',
            multiple: 'enheter'
        }
    }
}

const stringifyNumber = (n) => {
    if (n === 0) {
        return 'zero'
    } else if (n === 1) {
        return 'one'
    } else {
        return 'multiple'
    }
}

const getStringFromType = (type, n) => {
    return lang[type]['typeName'][stringifyNumber(n)]
}

export const getTypeFromProject = (project) => {
    return getStringFromType(project.project_type, project.objects.length)
}

export default lang