let startTime, timerInterval;
let times = [];

const display = document.getElementById('display');
const results = document.getElementById('results');

// Formato ajustado: Minutos:Segundos.Décimas
function formatTime(ms) {
    let mins = Math.floor(ms / 60000);
    let secs = Math.floor((ms % 60000) / 1000);
    let tenths = Math.floor((ms % 1000) / 100); // Una sola cifra de décima
    
    let minsStr = String(mins).padStart(2, '0');
    let secsStr = String(secs).padStart(2, '0');
    
    return `${minsStr}:${secsStr}.${tenths}`;
}

function start() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        display.textContent = formatTime(Date.now() - startTime);
    }, 100); // Actualizamos cada 100ms para las décimas
    
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
