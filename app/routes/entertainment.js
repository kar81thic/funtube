import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

      saveInvitation() {

        const newInvitation = this.store.createRecord('video', {videoId:'1', Catogory: 'test',  Description: 'test',
          link: 'test', thmbnailLink:'test'});
        newInvitation.save();
      }
    },
    model() {
      return this.store.findAll('video');
    }
});
