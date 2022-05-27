import { processObjectByType, clearCurrentJSON } from "./objects_processing.js" 
import { setup } from "./setup_handlers.js"

setup()
let schema = document.getElementById("schema")

function processJSONSchema(json) {
    clearCurrentJSON()
    let divBlock = document.createElement("div")

    let title = document.createElement("h2")
    title.innerText = json["title"]
    title.className = "schema_title"

    let description = document.createElement("h3")
    description.className = "schema_description"
    description.innerText = json["description"]

    divBlock.appendChild(title)
    divBlock.appendChild(description)
    divBlock.appendChild(processObjectByType(json, []))
    schema.appendChild(divBlock)
}

let invisibleInput = document.getElementById("inv_input")

invisibleInput.addEventListener("change", (event) => {
    let selectFileText = document.getElementById("select_file_title")
    let resultTextArea = document.getElementById("result_code_textarea")
    schema.innerHTML = ""

    let file = event.target.files[0]
    selectFileText.innerHTML = "Selected file: " + file.name

    let reader = new FileReader()
    reader.onload = function () {
        let result = JSON.parse(reader.result)
        resultTextArea.value = ""

        processJSONSchema(result)
    }

    reader.readAsText(file)
})
