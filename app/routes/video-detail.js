import Ember from 'ember';

export default Ember.Route.extend({

  model(params){
    console.log('params :: ', params.id);
    return this.store.find('video', params.id);
  }
});
