import Event from './Event';
import PolyfillIncludes from './PolyfillIncludes.js';

export default class EventManager{
    constructor(events, types){
        this.events = events;
        this.types = types;
    }

    run() {
        let poly = new PolyfillIncludes();
        const send = this.send;
        const types = this.types;

        this.events.forEach(function(evt) { 
            if (types.includes(evt.type)){
                let event = new Event(evt);
                send(evt, event.view);
            }
        });
    }

    send(evt, viewFunction) {
        setTimeout(function () {
            viewFunction(evt);
        }, evt.second * 1000);
    }
};