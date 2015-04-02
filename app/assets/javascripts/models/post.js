window.JournalApp = (window.JournalApp || {});
window.JournalApp.Models = {};
// window.JournalApp.Collections = {};

JournalApp.Models.Post = Backbone.Model.extend({
  urlRoot: '/posts'
});
