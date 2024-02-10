
use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use compiler::util::strings::StringMap;
use std::collections::HashMap;

#[derive(Deserialize)]
pub struct File {
    name: String,
    content: String
}

#[derive(Serialize)]
pub struct CompResult {
    success: bool,
    content: String
}

#[wasm_bindgen]
pub fn compile_to_js(js_files: JsValue, main_proc: JsValue) -> JsValue {
    let mut strings = StringMap::new();
    let mut files = HashMap::new();
    for file in serde_wasm_bindgen::from_value::<Vec<File>>(js_files).unwrap() {
        files.insert(strings.insert(&file.name), strings.insert(&file.content));
    }
    let main = serde_wasm_bindgen::from_value::<String>(main_proc).unwrap();
    return match compiler::compile(&mut strings, files, "js", Some(main)) {
        Ok(output) => serde_wasm_bindgen::to_value(
            &CompResult {
                success: true,
                content: output
            }
        ).unwrap(),
        Err(errors) => serde_wasm_bindgen::to_value(
            &CompResult {
                success: false,
                content: errors.iter().map(|e| e.display(&mut strings, false))
                    .collect::<Vec<String>>().join("\n")
            }
        ).unwrap()
    }
}