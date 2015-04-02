window.JournalApp = (window.JournalApp || {});
window.JournalApp.Views = (window.JournalApp.Views || {} );

JournalApp.Views.PostsIndexItem = Backbone.View.extend({
  tagName: 'li',
  template: JST['posts_index_item'],
  events: {
    'click .delete-post': 'removePost'
  },
  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },
  removePost: function () {
    this.model.destroy();
    this.remove();
  }
});
