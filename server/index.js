const schedule = require('node-schedule');
const {addSeconds} = require('date-fns');


const date = addSeconds(new Date(), 10);
const date1 = addSeconds(new Date(), 15);
const date2 = addSeconds(new Date(), 20);

var j = schedule.scheduleJob(date, function(){
    console.log('after 10');
});

var j2 = schedule.scheduleJob(date1, function(){
    console.log('after 15');
});

var j3 = schedule.scheduleJob(date2, function(){
    console.log('after 20');
});

