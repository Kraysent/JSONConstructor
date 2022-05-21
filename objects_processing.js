import { arrayDeepCopy, setValueOnPath } from "./miscellaneous.js"

var currentJSON = {}

export function clearCurrentJSON() {
    currentJSON = {}
}

function compile() {
    let txtArea = document.getElementById("result_code_textarea")
    txtArea.value = JSON.stringify(currentJSON, null, 2)
}

export function processObjectByType(obj, keys) {
    let objectBlock = null

    let defaults = {
        "string": "",
        "integer": 0,
        "number": 0,
        "boolean": false,
        "object": {},
        "array": []
    }

    if (keys.length != 0) {
        setValueOnPath(currentJSON, keys, defaults[obj["type"]])
    }

    switch (obj["type"]) {
        case "string":
            objectBlock = processStringType(obj, keys)
            break
        case "integer":
            objectBlock = processIntegerType(obj, keys)
            break
        case "number":
            objectBlock = processIntegerType(obj, keys)
            break
        case "boolean":
            objectBlock = processBooleanType(obj, keys)
            break
        case "object":
            objectBlock = processObjectType(obj, keys)
            break
        case "array":
            objectBlock = processArrayType(obj, keys)
            break
    }

    return objectBlock
}

function processStringType(obj, keys) {
    let container = document.createElement("div")
    container.className = "schema_field_contents"

    let currInput = document.createElement("input")
    currInput.className = "schema_field_input"
    currInput.placeholder = "Enter the string here"
    currInput.type = "text"

    let path = arrayDeepCopy(keys)

    currInput.oninput = function (event) {
        setValueOnPath(currentJSON, path, event.target.value)
        compile()
    }

    container.appendChild(currInput)

    return container
}

function processIntegerType(obj, keys) {
    let container = document.createElement("div")
    container.className = "schema_field_contents"

    let currInput = document.createElement("input")
    currInput.className = "schema_field_input"
    currInput.placeholder = "Enter the number here"
    currInput.type = "number"

    let path = arrayDeepCopy(keys)

    currInput.oninput = function (event) {
        let value = parseFloat(event.target.value)
        setValueOnPath(currentJSON, path, value ? value : 0)
        compile()
    }

    container.appendChild(currInput)

    return container
}

function processBooleanType(obj, keys) {
    let container = document.createElement("div")
    container.className = "schema_field_contents"

    let currInput = document.createElement("input")
    currInput.type = "checkbox"
    currInput.className = "schema_field_checkbox"

    let path = arrayDeepCopy(keys)

    currInput.onchange = function (event) {
        setValueOnPath(currentJSON, path, event.target.checked)
        compile()
    }

    container.appendChild(currInput)

    return container
}

function processArrayType(obj, keys) {
    let container = document.createElement("div")
    container.className = "schema_field_contents"

    let addButton = document.createElement("button")
    addButton.innerHTML = "+"
    addButton.className = "array_add_btn"

    let path = arrayDeepCopy(keys)

    addButton.onclick = function () {
        path.push(container.children.length - 1)
        let objectBlock = processObjectByType(obj["items"], path)
        path.pop()

        container.appendChild(objectBlock)
    }

    container.appendChild(addButton)

    return container
}

function processFieldHeader(name, type, description, parentDivBlock, required = false) {
    let container = document.createElement("div")
    container.className = "field_name_block"

    let fieldName = document.createElement("text")
    fieldName.className = "schema_field_name"
    fieldName.innerHTML = `<b>${name}</b>`

    let fieldType = document.createElement("text")
    fieldType.className = "schema_field_type"
    fieldType.innerHTML = required ? `: required ${type}` : `: ${type}`

    let fieldDesc = document.createElement("text")
    fieldDesc.className = "schema_field_desc"
    fieldDesc.innerHTML = 'i'
    description = description ? description : "No description provided."
    fieldDesc.setAttribute("description", description)

    container.onclick = function () {
        let children = parentDivBlock.children

        for (var i = 0; i < children.length; i++) {
            if (children[i].className != "field_name_block") {
                if (children[i].style.display == "none") {
                    children[i].style.display = "block"
                }
                else {
                    children[i].style.display = "none"
                }
            }
        }
    }

    container.appendChild(fieldName)
    container.appendChild(fieldType)
    container.appendChild(fieldDesc)

    return container
}

function processObjectType(obj, keys) {
    let container = document.createElement("div")
    container.className = "schema_field"
    let required = obj["required"]

    if ("properties" in obj) {
        for (const key of Object.keys(obj["properties"])) {
            let curr = obj["properties"][key]

            let currContainer = document.createElement("div")
            let fieldNameDivBlock = processFieldHeader(
                key, curr["type"], curr["description"], currContainer, 
                !required ? false : required.includes(key)
            )

            keys.push(key)
            let objectBlock = processObjectByType(curr, keys)
            keys.pop()

            currContainer.appendChild(fieldNameDivBlock)

            if (objectBlock != null) {
                currContainer.appendChild(objectBlock)
            }

            container.appendChild(currContainer)
        }
    }

    return container
}
