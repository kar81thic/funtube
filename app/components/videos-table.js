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
      const category = this.get('category') || 'All';
      let filterVideos = (category !== 'All') ? videos.filterBy('Catogory', category) : videos;
      var resultArr =  Ember.A();
      var temp = []
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
