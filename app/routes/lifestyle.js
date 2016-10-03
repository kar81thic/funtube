import Ember from 'ember';
const PAGE_SIZE = 100;
export default Ember.Route.extend({

  startAt: null,
  endAt: null,

  videos: null,

  getNextVideoIndex(videos){
    let filterVideos = videos.filterBy('Catogory', 'Lifestyle');
    if(videos.get('length') <= 0 || filterVideos.get('length') <=0){
      return -1;
    }
    let lastVideoId = filterVideos.get('lastObject.id');
    let lastVideoIndex = videos.mapBy('id').indexOf(lastVideoId);
    return (videos.get('length') === (lastVideoIndex + 1))? lastVideoIndex : lastVideoIndex + 1;
  },

  incrementPaginationCount(){
    let paginationCount = this.get('controller.paginationCount');
    paginationCount++;
    this.set('controller.paginationCount', paginationCount);
  },

  decrementPaginationCount(){
    let paginationCount = this.get('controller.paginationCount');
    paginationCount--;
    this.set('controller.paginationCount', paginationCount);
  },

  actions: {

    saveInvitation() {
        const newInvitation = this.store.createRecord('video', {videoId:'1', Catogory: 'test',  Description: 'test',
          link: 'test', thmbnailLink:'test'});
                  newInvitation.save();
      },

    prev: function () {
      let paginationCount = this.get('controller.paginationCount');
      if(paginationCount <= 0) {
        return false;
      }
      const model = this.get('currentModel');
      this.set('startAt', null);
      this.set('endAt', model.get('firstObject.id'));
      this.refresh();
     },

     next: function () {
       const model = this.get('currentModel');
       let nextVideoIndex = this.getNextVideoIndex(model);
       if(nextVideoIndex === -1){
        return false;
       }

       let lastVideo = model.objectAt(nextVideoIndex);
       let id = lastVideo.get('id');
       if(id === this.get('startAt')){
         return false;
       }
       this.set('startAt', id);
       this.set('endAt', null);
       this.refresh();
     }

    },
    model() {

      var query = {
        limitToFirst: PAGE_SIZE,
      };

      if (this.get('startAt')) {
        query.startAt = this.get('startAt');
      }

      if (this.get('endAt')) {
        query.endAt = this.get('endAt');
        delete query.limitToFirst;
        query.limitToLast = PAGE_SIZE;
      }

      return this.store.query('video', query).then((videos) => {
        if(videos.filterBy('Catogory', 'Lifestyle').length > 0){
          if(!!this.get('startAt')){
            this.incrementPaginationCount();
          }
          if(!!this.get('endAt')){
            this.decrementPaginationCount();
          }
          return videos;
        }else{
          //Return Previous loaded videos, when new records does not contains Lifestyle Catogory videos
          return this.get('currentModel');
        }
      });
    },
});
