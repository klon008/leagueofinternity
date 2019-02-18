timeoutId = null

parallaxScroll = ->
  scrolled = $(window).scrollTop()
  $('.interactive_elements').css 'top', 10 + (scrolled * .025) + 'vh'
  return



## !Important  use async!s
$(window).bind 'scroll', (e) ->
  if timeoutId
    clearTimeout timeoutId
  timeoutId = setTimeout(parallaxScroll, 0)
  return

##Работа с датами
now = moment().tz('Europe/Moscow')
nowUnix = now.valueOf()

ourRT = [3,4,7]
filteredRt = []

i = 0
while i < ourRT.length
  ddUnix = now.startOf('isoweek').set('day', (ourRT[i])).set('hour', 21).valueOf()
  if nowUnix < ddUnix
    filteredRt.push ddUnix
  i++

now = moment().tz('Europe/Moscow') ##reload now
c = moment(filteredRt[0]).diff(now, 'milliseconds')

interval = 1000

#Добавляет 0 перед чисел меньших 10
addZero = (sourse)->
  if sourse < 10
    sourse = "0"+sourse
  return sourse

##Склонение числительных
decCache = []
decCases = [
  2
  0
  1
  1
  1
  2
]

decOfNum = (number, titles) ->
  if !decCache[number]
    decCache[number] = if number % 100 > 4 and number % 100 < 20 then 2 else decCases[Math.min(number % 10, 5)]
  titles[decCache[number]]


window.onload = ()->
  duration = moment.duration(c, 'milliseconds');
  days = document.getElementById("day_rt").innerHTML = duration.days()
  document.getElementById("day_name").innerHTML = decOfNum(days, ['День', 'Дня', 'Дней'])
  hours = document.getElementById("rt_hours").innerHTML = addZero duration.hours()
  document.getElementById("hours_name").innerHTML = decOfNum(hours, ['Час', 'Часа', 'Часов'])
  minutes = document.getElementById("rt_minutes").innerHTML = addZero duration.minutes()
  document.getElementById("minutes_name").innerHTML = decOfNum(minutes, ['Минута', 'Минуты', 'Минут'])
  seconds = document.getElementById("rt_seconds").innerHTML = addZero duration.seconds()
  document.getElementById("seconds_name").innerHTML = decOfNum(seconds, ['Секунда', 'Секунды', 'Секунд'])
  return
# Таймер
blabla = ()->
  duration = moment.duration(c - interval, 'milliseconds');
  c = c - interval
  days = document.getElementById("day_rt").innerHTML = duration.days()
  document.getElementById("day_name").innerHTML = decOfNum(days, ['День', 'Дня', 'Дней'])
  hours = document.getElementById("rt_hours").innerHTML = addZero duration.hours()
  document.getElementById("hours_name").innerHTML = decOfNum(hours, ['Час', 'Часа', 'Часов'])
  minutes = document.getElementById("rt_minutes").innerHTML = addZero duration.minutes()
  document.getElementById("minutes_name").innerHTML = decOfNum(minutes, ['Минута', 'Минуты', 'Минут'])
  seconds = document.getElementById("rt_seconds").innerHTML = addZero duration.seconds()
  document.getElementById("seconds_name").innerHTML = decOfNum(seconds, ['Секунда', 'Секунды', 'Секунд'])
  return

setInterval( blabla, interval)

##console.log(moment(filteredRt[0]).format('dddd, MMMM DD YYYY, k:mm:ss'))