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

function readJSONSchema(json) {
    let title = document.createElement("h2")
    title.innerText = json["title"]

    let description = document.createElement("h3")
    description.innerText = json["description"]

    document.body.appendChild(title)
    document.body.appendChild(description)
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
