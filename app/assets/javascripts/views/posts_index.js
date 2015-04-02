window.JournalApp = (window.JournalApp || {});
window.JournalApp.Views = (window.JournalApp.Views || {} );

JournalApp.Views.PostsIndexView = Backbone.View.extend({
  template: JST['posts_index'],
  initialize: function () {
    this.listenTo(this.collection, 'sync remove add', this.render);
  },
  render: function () {
    this.$el.html(this.template());
    this.collection.each( function(post) {
      var postView = new JournalApp.Views.PostsIndexItem({model: post});
      postView.render();
      this.$('ul').append(postView.$el);
    }, this);
    return this;
  }
});
