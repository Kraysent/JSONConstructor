let selectFileText = document.getElementById("select_file_title")
let invisibleInput = document.getElementById("inv_input")
let btn = document.getElementById("open_schema_btn")
btn.onclick = function () { invisibleInput.click() }
let schema = document.getElementById("schema")

function processStringType(obj) {
    let divBlock = document.createElement("div")
    divBlock.className = "schema_field_contents"

    let currInput = document.createElement("input")

    let txt = document.createElement("text")
    txt.innerHTML = "Enter field contents: "

    divBlock.appendChild(txt)
    divBlock.appendChild(currInput)
    schema.appendChild(divBlock)
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
    schema.appendChild(divBlock)
}

function processObjectDescription(obj, name) {
    let currField = document.createElement("text")
    currField.className = "schema_field"
    currField.innerHTML = `[${obj["type"]}] <b>${name}</b>`
    schema.appendChild(currField)

    let currDesc = document.createElement("text")
    currDesc.className = "schema_field_description"
    currDesc.innerHTML = `${obj["description"]}`
    schema.appendChild(currDesc)
}

function processObjectType(obj, prefix = "") {
    for (const key of Object.keys(obj["properties"])) {
        curr = obj["properties"][key]

        processObjectDescription(curr, `${prefix}${key}`)

        if (curr["type"] == "string") {
            processStringType(curr)
        }
        else if (curr["type"] == "boolean") {
            processBooleanType(curr)
        }
        else if (curr["type"] == "object") {
            processObjectType(curr, `${key}.`)
        }
    }
}

function processJSONSchema(json) {
    let title = document.createElement("h1")
    title.innerText = json["title"]
    title.className = "schema_title"

    let description = document.createElement("h3")
    description.className = "schema_description"
    description.innerText = json["description"]

    schema.appendChild(title)
    schema.appendChild(description)

    processObjectType(json)
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
