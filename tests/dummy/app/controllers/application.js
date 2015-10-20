import Ember from 'ember';

export default Ember.Controller.extend({
  TEDevents: Ember.A([
    {
     id: 1,
     title: 'TED 2015',
    },
    {
      id: 2,
      title: 'TEDxNASA',
      isTEDxEvent: true
    },
    {
     id: 3,
     title: 'TED 2014',
    },
    {
      id: 4,
      title: 'TEDGlobal 2014'
    },
    {
      id: 5,
      title: 'TEDxNewYork',
      isTEDxEvent: true
    },
    {
      id: 6,
      title: 'TEDGlobal 2013'
    },
    {
      id: 7,
      title: 'TED 2013'
    }
  ]),
});
