var time, h, m, s;
window.onload = timeNow;

function timeNow() {
    let timers = Array.from(document.getElementsByClassName("timer"));
    let times = [];
    let i = 0;
    let d, h, m, s, str;
    timers.forEach(timer => {
        times.push(parseInt(timer.innerHTML));
    });
    times.forEach( t => {
            if (t > 0) {
                str = "";
                d = parseInt(t/(24*60*60));
                h = parseInt(t/(60*60)) % 24;
                m = parseInt(t/60) % 60;
                s = t % 60;
                str += d ? `${d} days ` : "";
                str += h ? `${h} hours ` : "";
                str += m ? `${m} minutes ` : "";
                str += `${s} seconds`;
                times[i]--;
            } else {
                str = "Currently airing"
            }
            timers[i].textContent = str;
            i++;
        })
    setInterval( () => {
        i = 0;
        times.forEach( t => {
            if (t > 0) {
                str = "";
                d = parseInt(t/(24*60*60));
                h = parseInt(t/(60*60)) % 24;
                m = parseInt(t/60) % 60;
                s = t % 60;
                str += d ? `${d} days ` : "";
                str += h ? `${h} hours ` : "";
                str += m ? `${m} minutes ` : "";
                str += `${s} seconds`;
                times[i]--;
            } else {
                str = "Currently airing"
            }
            timers[i].textContent = str;
            i++;
        })
    }, 1000);

}