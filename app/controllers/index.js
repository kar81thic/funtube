import Ember from 'ember';

const {
  computed
} = Ember;

export default Ember.Controller.extend({

  videoImg: 'https://pbs.twimg.com/profile_images/609730046618681344/HgPufn-i.png',

  filterVideos: computed('model.[]',{
     get(){
       const videos = this.get('model');
       var resultArr =  Ember.A();
       var temp = [];
       videos.forEach( (video, index)=>{
         temp.push(video);
         if(index !== 0 && (index + 1) % 3 === 0){
           resultArr.push(temp);
           temp = []
         }else if(index === (videos.get('length') - 1)){
           resultArr.push(temp);
           temp = [];
         }
       });

       return resultArr;
     }
  })
});
