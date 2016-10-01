import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({

  videoImg: 'https://pbs.twimg.com/profile_images/609730046618681344/HgPufn-i.png',

  categories: computed('model.[]', {
    get(){
      const videos = this.get('model') || Ember.A();
      let categories = ['All'];
      let filterCategories = videos.mapBy('Catogory').uniq();
      return [].concat(categories, filterCategories);
      //return categories;
    }
  }),

  selectedCategory: computed.oneWay('categories.firstObject'),

  filterVideos: computed('selectedCategory', 'categories.[]', {
    get(){
      const videos = this.get('model');
      const selectedCategory = 'News';//this.get('selectedCategory')'';
      let filterVideos = (selectedCategory !== 'All') ? videos.filterBy('Catogory', selectedCategory) : videos;
      var resultArr =  Ember.A();
      var temp = []
      filterVideos.forEach( (video, index)=>{
        temp.push(video);
        if(index !== 0 && (index + 1) % 3 === 0){
          resultArr.push(temp);
          temp = [];
        }else if(index === (filterVideos.get('length') - 1)){
           resultArr.push(temp);
           temp = [];
         }
      });

      return resultArr;
    }
  }),

  __setSelectedCategory(category){
    this.set('selectedCategory', category);
  },

  actions: {
    onCategorySelection(category){
      this.__setSelectedCategory(category);
    }
  }
});
