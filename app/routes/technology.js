import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

      saveInvitation() {

        const newInvitation = this.store.createRecord('video', {videoId:'1', Catogory: 'test',  Description: 'test',
          link: 'test', thmbnailLink:'test'});
        newInvitation.save();
      },

      prev: function () {
        Ember.Logger.log('Previous Button');
        //TODO: Previous button action logic goes here...
       },
       next: function () {
         Ember.Logger.log('Next Button');
         //TODO: Next button action logic goes here...
       }
    },
    model() {
      return this.store.findAll('video');
    }
});
