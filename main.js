let text = document.createElement("h3")
text.innerHTML = "File is not selected!"
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

function readJSONSchema(json) {
    let title = document.createElement("h1")
    title.innerText = json["title"]

    let description = document.createElement("h2")
    description.innerText = json["description"]

    document.body.appendChild(title)
    document.body.appendChild(description)

    let properties = json["properties"]
    
    for (const key of Object.keys(properties)) {
        curr = properties[key]

        let currField = document.createElement("text")
        currField.style = "font-size:20px"
        currField.innerHTML = `<br><br>(${curr['type']}) <b>${key}</b><br>`
        document.body.appendChild(currField)

        let currDesc = document.createElement("text")
        currDesc.style = "font-size:18px"
        currDesc.innerHTML = `${curr["description"]}<br>`
        document.body.appendChild(currDesc)

        if (curr["type"] == "string") {
            processStringType(curr)
        }
    }
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
