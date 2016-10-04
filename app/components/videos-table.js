import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({

  classNames: ['video--container'],

  category: null,

  filterVideos: computed('videos.[]', {
    get(){
      const videos = this.get('videos');
      const category = this.get('category');
      let filterVideos = (category === 'All') ? videos : videos.filterBy('Catogory', category);
      filterVideos = (filterVideos.get('length') > 20) ? filterVideos.slice(0, 20) : filterVideos;
      var temp = [];
      var resultArr = [];
      filterVideos.forEach( (video, index)=>{
        temp.push(video);
        if(index !== 0 && (index + 1) % 4 === 0){
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
});
