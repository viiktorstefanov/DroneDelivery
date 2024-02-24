import { engine } from "./app/engine.js";
import { clearPreviousResult } from "./app/services/clearPreviousResult.js";
import { generateErrorTemplate } from "./app/services/generateErrorTemplate.js";

const form = document.getElementById('form');
const fileInput = document.getElementById('fileInput');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    if(!fileInput.files[0]) {
        generateErrorTemplate('upload your file before submit!');
        return;
    }

    const file = fileInput.files[0];
    const splitInput = file.name.split('.');
    const fileTypeName = splitInput[splitInput.length - 1];

    if(file.type !== 'application/json') {
        generateErrorTemplate('Only JSON files are allowed');
        return;
    }
    if(fileTypeName !== 'json') {
        generateErrorTemplate('Only JSON files are allowed');
        return;
    }

    const reader = new FileReader();

    reader.onload = async function(event) {
        const jsonData = event.target.result;
        const oldInput = localStorage.getItem('input');
        if(oldInput) {
            localStorage.setItem('newOrders', jsonData);
            clearPreviousResult();
            engine();
            return;
        }
        localStorage.setItem('input', jsonData); 
        clearPreviousResult();
        engine();
    };

    reader.readAsText(fileInput.files[0]);
    form.reset();
});