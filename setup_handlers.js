export function setup() {
    let invisibleInput = document.getElementById("inv_input")
    let btn = document.getElementById("open_schema_btn")
    btn.onclick = function () { invisibleInput.click() }

    let light_mode_checkbox = document.getElementById("light_theme_checkbox")
    light_mode_checkbox.addEventListener("change", event => {
        let root = document.documentElement

        let template = function (mode) {
            root.style.setProperty("--primary", `var(--primary_${mode})`)
            root.style.setProperty("--complimentary", `var(--complimentary_${mode})`)
            root.style.setProperty("--analogous_1", `var(--analogous_1_${mode})`)
            root.style.setProperty("--analogous_2", `var(--analogous_2_${mode})`)
            root.style.setProperty("--analogous_2_transparent", `var(--analogous_2_${mode}_transparent)`)
            root.style.setProperty("--main_text", `var(--main_text_${mode})`)
            root.style.setProperty("--shadow_text", `var(--shadow_text_${mode})`)
        }

        if (light_mode_checkbox.checked) {
            template("light")
        }
        else {
            template("dark")
        }
    })
}