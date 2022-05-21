var currentJSON = {}

export function processObjectByType(obj, keys) {
    let objectBlock = null

    switch (obj["type"]) {
        case "string":
            objectBlock = processStringType(obj, keys)
            break
        case "integer":
            objectBlock = processIntegerType(obj)
            break
        case "number":
            objectBlock = processIntegerType(obj)
            break
        case "boolean":
            objectBlock = processBooleanType(obj)
            break
        case "object":
            objectBlock = processObjectType(obj, keys)
            break
        case "array":
            objectBlock = processArrayType(obj)
            break
    }

    return objectBlock
}

export function clearCurrentJSON() {
    currentJSON = {}
}

function compile() {
    let txtArea = document.getElementById("result_code_textarea")
    txtArea.value = JSON.stringify(currentJSON, null, 2)
}

function processStringType(obj, keys) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let currInput = document.createElement("input")
    currInput.className = "schema_field_input"
    currInput.placeholder = "Enter the string here"
    currInput.type = "text"

    let keysCopy = []
    for (let key of keys) {
        keysCopy.push(key)
    }

    currInput.oninput = function (event) {
        console.log(keysCopy)

        let iter = currentJSON
        for (let i = 0; i < keysCopy.length - 1; i++) {
            iter = iter[keysCopy[i]]
        }

        iter[keysCopy[keysCopy.length - 1]] = event.target.value

        compile()
    }

    divBlock.appendChild(currInput)

    return divBlock
}

function processIntegerType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let currInput = document.createElement("input")
    currInput.className = "schema_field_input"
    currInput.placeholder = "Enter the number here"
    currInput.type = "number"
    currInput.oninput = function (event) {
        compile(event.target.value)
    }

    divBlock.appendChild(currInput)

    return divBlock
}

function processBooleanType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let currInput = document.createElement("input")
    currInput.type = "checkbox"
    currInput.className = "schema_field_checkbox"

    divBlock.appendChild(currInput)

    return divBlock
}

function processArrayType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let addBtn = document.createElement("button")
    addBtn.innerHTML = "+"
    addBtn.className = "array_add_btn"

    addBtn.onclick = function () {
        let objectBlock = processObjectByType(obj["items"])

        divBlock.appendChild(objectBlock)
    }

    divBlock.appendChild(addBtn)

    return divBlock
}

function processFieldName(name, type, parentDivBlock) {
    let divBlock = document.createElement("div")
    divBlock.className = "field_name_block"

    let currField = document.createElement("text")
    currField.className = "schema_field_name"
    currField.innerHTML = `<b>${name}</b>`

    let currType = document.createElement("text")
    currType.className = "schema_field_type"
    currType.innerHTML = `: ${type}`

    divBlock.onclick = function () {
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

    divBlock.appendChild(currField)
    divBlock.appendChild(currType)


    return divBlock
}

function processObjectType(obj, keys) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field"

    if ("properties" in obj) {
        for (const key of Object.keys(obj["properties"])) {
            let curr = obj["properties"][key]

            let currDivBlock = document.createElement("div")
            let fieldNameDivBlock = processFieldName(key, curr["type"], currDivBlock)
            let currDesc = null

            if ("description" in curr) {
                currDesc = document.createElement("text")
                currDesc.className = "schema_field_description"
                currDesc.innerHTML = `${curr["description"]}`
            }

            let iter = currentJSON
            for (let ikey of keys) {
                iter = iter[ikey]
            }
            iter[key] = {}
            keys.push(key)
            let objectBlock = processObjectByType(curr, keys)
            keys.pop()

            currDivBlock.appendChild(fieldNameDivBlock)

            if (currDesc != null) {
                currDivBlock.appendChild(currDesc)
            }

            if (objectBlock != null) {
                currDivBlock.appendChild(objectBlock)
            }

            divBlock.appendChild(currDivBlock)
        }
    }

    return divBlock
}
