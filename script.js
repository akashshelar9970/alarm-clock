document.addEventListener('DOMContentLoaded', function() {
    const activeTimers = [];

    function startTimer(hours, minutes, seconds, index) {
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        document.getElementById('active-timers').appendChild(timerElement);

        let totalSeconds = hours * 3600 + minutes * 60 + seconds;

        const interval = setInterval(function() {
            totalSeconds--;

            if (totalSeconds <= 0) {
                clearInterval(interval);
                timerElement.remove();
                displayTimerEnd();
            } else {
                const hoursRemaining = Math.floor(totalSeconds / 3600);
                const minutesRemaining = Math.floor((totalSeconds % 3600) / 60);
                const secondsRemaining = totalSeconds % 60;

                timerElement.innerHTML = `
                    <p>${String(hoursRemaining).padStart(2, '0')} : ${String(minutesRemaining).padStart(2, '0')} : ${String(secondsRemaining).padStart(2, '0')}</p>
                    <button class="stop-timer" data-index="${index}">Stop Timer</button>
                `;
            }
        }, 1000);

        activeTimers.push({ interval, index });
    }

    function stopTimer(index) {
        const timer = activeTimers.find(timer => timer.index === index);
        clearInterval(timer.interval);
        activeTimers.splice(activeTimers.indexOf(timer), 1);
    }

    function displayTimerEnd() {
        const timerEndElement = document.querySelector('.timer-end');
        timerEndElement.style.display = 'block';

        const audio = document.getElementById('audio');
        audio.play();
    }

    document.getElementById('start-timer').addEventListener('click', function() {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        if (hours === 0 && minutes === 0 && seconds === 0) {
            alert('Please enter a valid time.');
            return;
        }

        startTimer(hours, minutes, seconds, activeTimers.length);
    });

    document.addEventListener('click', function(event) {
        if (event.target && event.target.className == 'stop-timer') {
            const index = event.target.getAttribute('data-index');
            stopTimer(parseInt(index));
        }
    });
});
