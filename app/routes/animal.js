import Ember from 'ember';

export default Ember.Route.extend({
    model() {
      return this.store.findAll('video');
    },

    actions: {
      prev: function () {
        Ember.Logger.log('Previous Button');
        //TODO: Previous button action logic goes here...
       },
       next: function () {
         Ember.Logger.log('Next Button');
         //TODO: Next button action logic goes here...
       }
    }
});
