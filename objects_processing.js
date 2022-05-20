export function processObjectByType(obj) {
    let objectBlock = null

    switch (obj["type"]) {
        case "string":
            objectBlock = processStringType(obj)
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
            objectBlock = processObjectType(obj)
            break
        case "array":
            objectBlock = processArrayType(obj)
            break
    }

    return objectBlock
}

function compile(str) {
    let txtArea = document.getElementById("result_code_textarea")
    txtArea.innerText = str
}

function processStringType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let txt = document.createElement("text")
    txt.innerHTML = "Enter field contents: "

    let currInput = document.createElement("input")
    currInput.oninput = function (event) {
        compile(event.target.value)
    }

    divBlock.appendChild(txt)
    divBlock.appendChild(currInput)

    return divBlock
}

function processIntegerType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let txt = document.createElement("text")
    txt.innerHTML = "Enter field contents: "

    let currInput = document.createElement("input")
    currInput.type = "number"

    divBlock.appendChild(txt)
    divBlock.appendChild(currInput)

    return divBlock
}

function processBooleanType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let txt = document.createElement("text")
    txt.innerHTML = "Enabled: "

    let currInput = document.createElement("input")
    currInput.type = "checkbox"

    divBlock.appendChild(txt)
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

function processObjectType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field"

    if ("properties" in obj) {
        for (const key of Object.keys(obj["properties"])) {
            let curr = obj["properties"][key]

            let currDivBlock = document.createElement("div")

            let expandButton = document.createElement("button")
            expandButton.innerHTML = "^"
            expandButton.className = "expand_btn"

            let currField = document.createElement("text")
            currField.className = "schema_field_name"
            currField.innerHTML = `<b>${key}</b>`

            expandButton.onclick = function () {
                let children = currDivBlock.children

                for (var i = 0; i < children.length; i++) {
                    if (children[i].className != "schema_field_name" && children[i].className != "expand_btn") {
                        if (children[i].style.display == "none") {
                            children[i].style.display = "block"
                        }
                        else {
                            children[i].style.display = "none"
                        }
                    }
                }
            }

            let currDesc = null

            if ("description" in curr) {
                currDesc = document.createElement("text")
                currDesc.className = "schema_field_description"
                currDesc.innerHTML = `[${curr["type"]}] ${curr["description"]}`
            }

            let objectBlock = processObjectByType(curr)

            currDivBlock.appendChild(currField)
            currDivBlock.appendChild(expandButton)

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
