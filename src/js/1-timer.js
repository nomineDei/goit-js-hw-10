import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timerInput = document.querySelector("input#datetime-picker");
const startButton = document.querySelector(".timer-btn")

let userSelectedDate;
let time;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      const now = new Date();

      if (selectedDate > now) {
          userSelectedDate = selectedDate;
          startButton.disabled = false;
          time = new Timer(userSelectedDate);
      } else {
          iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
            timeout: 3000,
          });
      }
  },
};

flatpickr(timerInput, options);



class Timer {

   constructor(targetDate) {
    this.targetDate = targetDate;
    this.intervalId = null;
  };
  
  start() {
    if (this.intervalId !== null) return;
  
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        this.updateUI(0);
        timerInput.disabled = false;
        return;
      }

      this.updateUI(deltaTime);
    }, 1000);
  }

   updateUI(deltaTime) {
    const { days, hours, minutes, seconds } = this.convertMs(deltaTime);

    document.querySelector('[data-days]').textContent = this.pad(days);
    document.querySelector('[data-hours]').textContent = this.pad(hours);
    document.querySelector('[data-minutes]').textContent = this.pad(minutes);
    document.querySelector('[data-seconds]').textContent = this.pad(seconds);
  }

  convertMs(ms) {
  
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

  
      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);

      return { days, hours, minutes, seconds }
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}


startButton.addEventListener("click", () => {
  if (time) {
    time.start();
    startButton.disabled = true;
    timerInput.disabled = true;
  }
});