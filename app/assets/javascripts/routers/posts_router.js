window.JournalApp = (window.JournalApp || {});
JournalApp.Routers = {};

JournalApp.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    '': 'postsIndex',
    'posts/new': 'newPost',
    'posts/:id': 'postShow'
  },

  initialize: function(el, collection) {
    this.collection = collection;
    this.$el = $(el);
    // this.$sideBarEl = $('<div class="sidebar"></div>');
    this.$mainEl = $('<div class="main"></div>');
    // this.$el.append(this.$sideBarEl);
    this.$el.append(this.$mainEl);
    // this.collection = new JournalApp.Collections.Posts();
    this.collection.fetch();
    this.$el = this.$mainEl;
    // this.postsIndex();
  },

  postsIndex: function () {
    // var postsIndexView = new JournalApp.Views.PostsIndexView({ collection: this.collection });
    // this.$sideBarEl.html(postsIndexView.render().$el);
  },

  postShow: function (id) {
    var post = this.collection.getOrFetch(parseInt(id));
    var postsShow = new JournalApp.Views.PostsShow({model: post});

    var postEdit = new JournalApp.Views.PostFormView({model: post});
    this.$el.html(postsShow.render().$el).append(postEdit.render().$el);
  },

  newPost: function () {
    var newPost = new JournalApp.Models.Post();
    var newPostForm = new JournalApp.Views.PostFormView({model: newPost, collection: this.collection});
    this.$el.html(newPostForm.render().$el);
  }
});
