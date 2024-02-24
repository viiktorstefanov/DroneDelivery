export function clearPreviousResult() {
    const resultSection = document.getElementById('result');
    const spans = resultSection.querySelectorAll('span');
    if(spans) {
      resultSection.innerHTML = '';
    };
};