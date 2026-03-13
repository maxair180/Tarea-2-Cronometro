let startTime, timerInterval;
let times = [];

const display = document.getElementById('display');
const results = document.getElementById('results');

// Formato corregido: Minutos:Segundos.Centésimas (2 dígitos)
function formatTime(ms) {
    let mins = Math.floor(ms / 60000);
    let secs = Math.floor((ms % 60000) / 1000);
    // Extraemos las centésimas (00-99)
    let centis = Math.floor((ms % 1000) / 10); 
    
    let minsStr = String(mins).padStart(2, '0');
    let secsStr = String(secs).padStart(2, '0');
    let centisStr = String(centis).padStart(2, '0');
    
    return `${minsStr}:${secsStr}.${centisStr}`;
}

function start() {
    startTime = Date.now();
    // Bajamos el intervalo a 10ms para que las centésimas fluyan suavemente
    timerInterval = setInterval(() => {
        display.textContent = formatTime(Date.now() - startTime);
    }, 10); 
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('captureBtn').disabled = false;
    document.getElementById('stopBtn').disabled = false;
}

function capture() {
    const currentTime = Date.now() - startTime;
    const numComp = times.length + 1;
    
    const diffFirst = times.length === 0 ? "---" : "+" + formatTime(currentTime - times[0]);
    const diffPrev = times.length === 0 ? "---" : "+" + formatTime(currentTime - times[times.length - 1]);
    
    times.push(currentTime);
    
    const row = `<tr>
        <td>${numComp}</td>
        <td>${formatTime(currentTime)}</td>
        <td>${diffFirst}</td>
        <td>${diffPrev}</td>
    </tr>`;
    results.insertAdjacentHTML('beforeend', row);
}

function stop() {
    clearInterval(timerInterval);
    document.getElementById('captureBtn').disabled = true;
    document.getElementById('stopBtn').disabled = true;
}

document.getElementById('startBtn').onclick = start;
document.getElementById('captureBtn').onclick = capture;
document.getElementById('stopBtn').onclick = stop;
