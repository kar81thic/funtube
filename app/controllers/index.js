import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({

  category: 'All',

  pageSize: 20,

  videos: computed('model.[]',{
    get(){
      const videos = this.get('model');
      const category = this.get('category');
      return (category === 'All')? videos : videos.filterBy('Catogory', category);
    }
  }),

  totalPageCount: computed('videos.[]', {
    get(){
      const videos = this.get('videos');
      const length = videos.get('length');
      Ember.Logger.log('videos length :: ', length);

      return Math.ceil(length / this.get('pageSize'));
    }
  }),
});
