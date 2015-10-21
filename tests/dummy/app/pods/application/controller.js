import Ember from 'ember';

export default Ember.Controller.extend({
  TEDevents: Ember.A([
    {
     id: 1,
     title: 'TED 2015',
     keywords: ''
    },
    {
      id: 2,
      title: 'TEDxNASA',
      keywords: '',
      isTEDxEvent: true
    },
    {
     id: 3,
     title: 'TED 2014',
     keywords: ''
    },
    {
      id: 4,
      title: 'TEDGlobal 2014',
      keywords: ''
    },
    {
      id: 5,
      title: 'TEDxNewYork',
      keywords: 'NYC',
      isTEDxEvent: true
    },
    {
      id: 6,
      title: 'TEDGlobal 2013',
      keywords: ''
    },
    {
      id: 7,
      title: 'TED 2013',
      keywords: ''
    }
  ])
});
