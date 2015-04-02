window.JournalAppProject = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(collection) {
    new JournalApp.Routers.PostsRouter($('body'), collection);
    Backbone.history.start();
  }
};

$(document).ready(function(){
  this.$sideBarEl = $('<div class="sidebar"></div>');
  this.collection = new JournalApp.Collections.Posts();
  var postsIndexView = new JournalApp.Views.PostsIndexView({ collection: this.collection });
  this.$sideBarEl.html(postsIndexView.render().$el);
  $('body').append(this.$sideBarEl);
  JournalAppProject.initialize(this.collection);
});
