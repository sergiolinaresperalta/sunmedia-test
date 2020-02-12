import EventManager from './EventManager';

export default class EventManagerFactory{
    static create(events, types) {
        return new EventManager(events, types);
    }
};