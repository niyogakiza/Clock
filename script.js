'use strict';

function onReady() {
    console.log('Hello Clock');

    var clock = new Clock('clock');
    var clock2 = new Clock('clock2',+120,'RW');
    var clock3 = new Clock('clock3',+180,'UG');
}

Date.prototype.updateSeconds = function(){

    this.setSeconds(this.getSeconds()+1);

};

Date.prototype.autoClock = function(isAuto){
    clearInterval(this.clockInterval);

    if(isAuto){
        var that = this;
        this.clockInterval = setInterval(function(){that.updateSeconds()}, 1000);

    }
};

function Clock(id,offset,label) {

        offset = offset || 0;
        label = label || ' EURO ';
        var d = new Date();
        var offset = (offset + d.getTimezoneOffset())*60*1000;
        this.d = new Date(offset +  d.getTime());
        this.d.autoClock(true);
        this.id = id;
        this.label = label;
    
    var that = this;
    setInterval(function(){that.updateClock();}, 1000);
    this.updateClock();

}

Clock.prototype.updateClock = function() {

    var date = this.d;
    //date.updateSeconds();
    var clock = document.getElementById(this.id);
    clock.innerHTML = this.formatDigits(date.getHours()) + ":" + this.formatDigits(date.getMinutes()) + ":" + this.formatDigits(date.getSeconds()) + " " + this.label;

};

Clock.prototype.formatDigits = function(val) {

    if(val < 10 ) val = "0" + val;
    return val;
};

window.onload = onReady();


