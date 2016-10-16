import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({

  category: 'All',

  videos: computed('model.[]',{
    get(){
      const videos = this.get('model');
      const category = this.get('category');
      return (category === 'All')? videos : videos.filterBy('Catogory', category);
    }
  }),
});
