let startTime, timerInterval;
let times = [];

const display = document.getElementById('display');
const results = document.getElementById('results');

function formatTime(ms) {
    let date = new Date(ms);
    let mins = String(date.getUTCMinutes()).padStart(2, '0');
    let secs = String(date.getUTCSeconds()).padStart(2, '0');
    let mss = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${mins}:${secs}.${mss}`;
}

function start() {
    startTime = Date.now();
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
    
    // Diferencia con el primero
    const diffFirst = times.length === 0 ? "---" : "+" + formatTime(currentTime - times[0]);
    // Diferencia con el anterior
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