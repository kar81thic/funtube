import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  Catogory: attr(),
  Description: attr(),
  link: attr(),
  thmbnailLink: attr()
});
