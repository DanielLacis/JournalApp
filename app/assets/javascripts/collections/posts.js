window.JournalApp = (window.JournalApp || {});
// window.JournalApp.Models = {};
window.JournalApp.Collections = {};

JournalApp.Collections.Posts = Backbone.Collection.extend({
  model: JournalApp.Models.Post,
  url: '/posts',
  getOrFetch: function (id) {
    var post = this.findWhere({ id: id });
    if (post) {
      post.fetch();
    }
    else {
      post = new JournalApp.Models.Post({ id: id} );
      post.fetch();
      this.add(post);
    }
    return post;
  }
});
