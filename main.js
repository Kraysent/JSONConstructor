let text = document.createElement("h3")
text.innerHTML = "Select file to create file based on JSON schema."
document.body.appendChild(text)

let invisibleInput = document.createElement("input")
invisibleInput.type = "file"
invisibleInput.style = "display: none"
document.body.appendChild(invisibleInput)

let btn = document.createElement("button")
btn.innerText = "Open JSON Schema!"
btn.onclick = function () { invisibleInput.click() }
document.body.appendChild(btn)

function processStringType(obj) {
    let currInput = document.createElement("input")
    let txt = document.createElement("text")

    txt.innerHTML = "Enter field contents: "

    document.body.append(txt)
    document.body.append(currInput)
}

function processBooleanType(obj) {
    let currInput = document.createElement("input")
    currInput.type = "checkbox"
    let txt = document.createElement("text")

    txt.innerHTML = "Enabled: "

    document.body.append(txt)
    document.body.append(currInput)
}

function processObjectDescription(obj, name) {
    let currField = document.createElement("text")
    currField.style = "font-size:20px"
    currField.innerHTML = `<br><br>[${obj["type"]}] <b>${name}</b><br>`
    document.body.appendChild(currField)

    let currDesc = document.createElement("text")
    currDesc.style = "font-size:18px"
    currDesc.innerHTML = `${obj["description"]}<br>`
    document.body.appendChild(currDesc)
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

function readJSONSchema(json) {
    let title = document.createElement("h1")
    title.innerText = json["title"]

    let description = document.createElement("h2")
    description.innerText = json["description"]

    document.body.appendChild(title)
    document.body.appendChild(description)

    processObjectType(json)
}

invisibleInput.addEventListener('change', (event) => {
    let file = event.target.files[0]
    text.innerHTML = "Selected file: " + file.name

    let reader = new FileReader()
    reader.onload = function () {
        result = JSON.parse(reader.result)
        
        readJSONSchema(result)
    }
    
    reader.readAsText(file)
})
