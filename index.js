import { engine } from "./app/engine.js";
import { generateTemplate } from "./app/services/generateTemplate.js";

const form = document.getElementById('form');
const fileInput = document.getElementById('fileInput');

const input = localStorage.getItem('input');

if(input) {
    const result = engine(JSON.parse(input));
    generateTemplate(result);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reader = new FileReader();

    reader.onload = function(event) {
        const jsonData = event.target.result;
        const parsedData = JSON.parse(jsonData);
        localStorage.setItem('input', JSON.stringify(parsedData));
        const result = engine(parsedData);

        const spans = document.getElementById('result').querySelectorAll(span);
        spans.forEach(span => span.remove());
        generateTemplate(result);
    };

    reader.readAsText(fileInput.files[0]);
    form.reset();
});