// Generated by CoffeeScript 1.12.7
var addZero, blabla, c, ddUnix, decCache, decCases, decOfNum, filteredRt, i, interval, now, nowUnix, ourRT, parallaxScroll, timeoutId;

timeoutId = null;

parallaxScroll = function() {
  var scrolled;
  scrolled = $(window).scrollTop();
  $('.interactive_elements').css('top', 10 + (scrolled * .025) + 'vh');
};

$(window).bind('scroll', function(e) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(parallaxScroll, 0);
});

now = moment().tz('Europe/Moscow');

nowUnix = now.valueOf();

ourRT = [3, 4, 7];

filteredRt = [];

i = 0;

while (i < ourRT.length) {
  ddUnix = now.startOf('isoweek').set('day', ourRT[i]).set('hour', 21).valueOf();
  if (nowUnix < ddUnix) {
    filteredRt.push(ddUnix);
  }
  i++;
}

now = moment().tz('Europe/Moscow');

c = moment(filteredRt[0]).diff(now, 'milliseconds');

interval = 1000;

addZero = function(sourse) {
  if (sourse < 10) {
    sourse = "0" + sourse;
  }
  return sourse;
};

decCache = [];

decCases = [2, 0, 1, 1, 1, 2];

decOfNum = function(number, titles) {
  if (!decCache[number]) {
    decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
  }
  return titles[decCache[number]];
};

window.onload = function() {
  var days, duration, hours, minutes, seconds;
  duration = moment.duration(c, 'milliseconds');
  days = document.getElementById("day_rt").innerHTML = duration.days();
  document.getElementById("day_name").innerHTML = decOfNum(days, ['День', 'Дня', 'Дней']);
  hours = document.getElementById("rt_hours").innerHTML = addZero(duration.hours());
  document.getElementById("hours_name").innerHTML = decOfNum(hours, ['Час', 'Часа', 'Часов']);
  minutes = document.getElementById("rt_minutes").innerHTML = addZero(duration.minutes());
  document.getElementById("minutes_name").innerHTML = decOfNum(minutes, ['Минута', 'Минуты', 'Минут']);
  seconds = document.getElementById("rt_seconds").innerHTML = addZero(duration.seconds());
  document.getElementById("seconds_name").innerHTML = decOfNum(seconds, ['Секунда', 'Секунды', 'Секунд']);
};

blabla = function() {
  var days, duration, hours, minutes, seconds;
  duration = moment.duration(c - interval, 'milliseconds');
  c = c - interval;
  days = document.getElementById("day_rt").innerHTML = duration.days();
  document.getElementById("day_name").innerHTML = decOfNum(days, ['День', 'Дня', 'Дней']);
  hours = document.getElementById("rt_hours").innerHTML = addZero(duration.hours());
  document.getElementById("hours_name").innerHTML = decOfNum(hours, ['Час', 'Часа', 'Часов']);
  minutes = document.getElementById("rt_minutes").innerHTML = addZero(duration.minutes());
  document.getElementById("minutes_name").innerHTML = decOfNum(minutes, ['Минута', 'Минуты', 'Минут']);
  seconds = document.getElementById("rt_seconds").innerHTML = addZero(duration.seconds());
  document.getElementById("seconds_name").innerHTML = decOfNum(seconds, ['Секунда', 'Секунды', 'Секунд']);
};

setInterval(blabla, interval);
