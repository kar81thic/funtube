import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Component.extend({

  classNames: ['video--container'],

  pageCurrentIndex: 1,

  pageCount: 0,

  startAt: 0,

  endAt: 20,

  pageSize: 20,

  totalPageCount: computed('videos.[]', {
    get(){
      const videos = this.get('videos');
      const length = videos.get('length');
      Ember.Logger.log('videos length :: ', length);

      return Math.ceil(length / this.get('pageSize'));
    }
  }),

  filterVideos: computed('pageCurrentIndex', {
    get(){
      const videos = this.get('videos');
      let startAt = this.get('startAt'),
      endAt = this.get('endAt'),
      filterVideos = videos.slice(startAt, endAt),
      temp = [],
      resultArr = [];
      Ember.Logger.log('category ', filterVideos.mapBy('Catogory').uniq());
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


  __loadNextPage(){
    const pageCurrentIndex = this.get('pageCurrentIndex');
    Ember.Logger.log('pageCurrentIndex :: ' + pageCurrentIndex + '\n totalVideoSize :: ' + this.get('totalPageCount'));
    if(pageCurrentIndex >= this.get('totalPageCount')){
      return false;
    }
    let startAt = this.get('startAt') + 20;
    let endAt = this.get('endAt') + 20;
    this.setProperties({
      startAt: startAt ,
      endAt: endAt
    });
    this.set('pageCurrentIndex', pageCurrentIndex + 1);
  },

  __loadPreviousPage(){
    const pageCurrentIndex = this.get('pageCurrentIndex');
    if(pageCurrentIndex <= 1){
      return false;
    }
    let startAt = this.get('startAt') - 20;
    let endAt = this.get('endAt') - 20;
    this.setProperties({
      startAt: startAt,
      endAt: endAt
    });

    this.set('pageCurrentIndex', pageCurrentIndex - 1);
  },

  resetProperties(){
    let pageCurrentIndex = 1,
    pageCount = 0,
    totalPageCount = null,
    startAt = 0,
    endAt = 20;
    this.setProperties({
      pageCurrentIndex,
      pageCount,
      totalPageCount,
      startAt,
      endAt,
    });
  },

  willDestroy(){
    this.resetProperties();
  },

  actions: {
    nextPage(){
      this.__loadNextPage();
    },

    previousPage(){
      this.__loadPreviousPage();
    }
  }
});
