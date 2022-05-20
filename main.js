let selectFileText = document.getElementById("select_file_title")
let invisibleInput = document.getElementById("inv_input")
let btn = document.getElementById("open_schema_btn")
btn.onclick = function () { invisibleInput.click() }
let schema = document.getElementById("schema")

function processStringType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let txt = document.createElement("text")
    txt.innerHTML = "Enter field contents: "

    let currInput = document.createElement("input")

    divBlock.appendChild(txt)
    divBlock.appendChild(currInput)

    return divBlock
}

function processIntegerType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let txt = document.createElement("text")
    txt.innerHTML = "Enter number: "

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
        objectBlock = processObjectByType(obj["items"])

        divBlock.appendChild(objectBlock)
    }

    divBlock.appendChild(addBtn)

    return divBlock
}

function processObjectType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field"

    console.log(Object.keys(obj))
    console.log(obj["type"])

    if ("properties" in obj) {
        for (const key of Object.keys(obj["properties"])) {
            let currDivBlock = document.createElement("div")
            // currDivBlock.className = "schema_field"
            curr = obj["properties"][key]

            let currDesc = null
            let objectBlock = null

            let currField = document.createElement("text")
            currField.className = "schema_field_name"
            currField.innerHTML = `<b>${key}</b>`

            if ("description" in curr) {
                currDesc = document.createElement("text")
                currDesc.className = "schema_field_description"
                currDesc.innerHTML = `[${curr["type"]}] ${curr["description"]}`
            }

            objectBlock = processObjectByType(curr)

            currDivBlock.appendChild(currField)

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

function processJSONSchema(json) {
    let divBlock = document.createElement("div")

    let title = document.createElement("h2")
    title.innerText = json["title"]
    title.className = "schema_title"

    let description = document.createElement("h3")
    description.className = "schema_description"
    description.innerText = json["description"]

    divBlock.appendChild(title)
    divBlock.appendChild(description)
    divBlock.appendChild(processObjectType(json))
    schema.appendChild(divBlock)
}

function processObjectByType(obj) {
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

invisibleInput.addEventListener('change', (event) => {
    schema.innerHTML = ""
    btn.style.borderColor = "var(--file_selected)"
    selectFileText.style.backgroundColor = "var(--file_selected)"

    let file = event.target.files[0]
    selectFileText.innerHTML = "Selected file: " + file.name

    let reader = new FileReader()
    reader.onload = function () {
        result = JSON.parse(reader.result)

        processJSONSchema(result)

        let saveButton = document.createElement("button")
        saveButton.innerText = "Save"
        saveButton.className = "save_btn"
        schema.appendChild(saveButton)
    }

    reader.readAsText(file)
})
