import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({

  category: 'Lifestyle',

  paginationCount: null,

  isPreviousBtnDisabled: computed('paginationCount', {
    get(){
      const paginationCount = this.get('paginationCount');
      return !(!paginationCount || paginationCount <= 0);
    }
  }),

  init(){
    this.set('paginationCount', 0);
  }
});
