function isObject(obj) {
	return typeof obj == 'object' && !!obj
}

function isArray(obj) {
	return Array.isArray(obj)
}

/* istanbul ignore next */
function isPrimitive(value) {
	return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

function splitPath(path) {
	var flag = -1
	return path.split('.').map((e, i, a) => {
		if (e.endsWith('\\') && i < a.length - 1) {
			flag = i + 1
			return e.substr(0, e.length - 1) + '.' + a[i + 1]
		} else {
			if (flag == i) {
				flag = -1
				return
			} else {
				return e
			}
		}
	}).filter(e => {
		return e !== undefined
	})
}

function getLeaf(obj, key) {
	var props = typeof key === 'string' ? splitPath(key) : key
	var currObj = obj
	for (var i = 0; i < props.length - 1; i++) {
		if (currObj[props[i]] instanceof Object) {
			currObj = currObj[props[i]]
		} else {
			return
		}
	}
	return {
		obj: currObj,
		key: props[props.length - 1]
	}
}

function getValue(obj, key) {
	var leaf = getLeaf(obj, key)
	return leaf && leaf.obj[leaf.key]
}

function getProperty(obj, key) {
	var leaf = getLeaf(obj, key)
	return leaf && Object.getOwnPropertyDescriptor(leaf.obj, leaf.key)
}

const ut = {
	isObject,
	isArray,
	isPrimitive,
	getLeaf,
	getValue,
	getProperty,
	splitPath
}

export default ut