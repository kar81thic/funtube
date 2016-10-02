import Ember from 'ember';
const PAGE_SIZE = 20;
export default Ember.Route.extend({

  startAt: null,
  endAt: null,
  actions: {

  saveInvitation() {
      const newInvitation = this.store.createRecord('video', {videoId:'1', Catogory: 'test',  Description: 'test',
        link: 'test', thmbnailLink:'test'});
                newInvitation.save();
    },

  prev: function () {
     const model = this.get('currentModel');
     const lifeStyleVideos = model.filterBy('Catogory', 'Lifestyle');
     let id;
     if(lifeStyleVideos.get('length') > 0){
        id = lifeStyleVideos.get('firstObject.id');
     }
     this.set('startAt', null);
     this.set('endAt', id);
     this.refresh();
   },

   next: function () {
     const model = this.get('currentModel');
     const lifeStyleVideos = model.filterBy('Catogory', 'Lifestyle');
     let id;
     if(lifeStyleVideos.get('length') > 0){
        id = lifeStyleVideos.get('firstObject.id');
     }
     this.set('startAt', id);
     this.set('endAt', null);
     this.refresh();
   }

    },
    model() {

      var query = {
        limitToFirst: PAGE_SIZE + 1
      };

      if (this.get('startAt')) {
        query.startAt = this.get('startAt');
      }

      if (this.get('endAt')) {
        query.endAt = this.get('endAt');
        delete query.limitToFirst;
        query.limitToLast = PAGE_SIZE+1;
      }

      if(!this.get('startAt') && !this.get('endAt')){
        //TODO: Change limit count as prefered
        query.limitToFirst = 300;
      }

      return this.store.query('video', query).then((videos) => {
        if (this.get('startAt')) {
          return videos.slice(1);
        } else {
          return videos.slice(0, videos.get('length')-1);
        }
      });
    },
});
