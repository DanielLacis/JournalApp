window.JournalApp = (window.JournalApp || {});
window.JournalApp.Views = (window.JournalApp.Views || {} );

JournalApp.Views.PostFormView = Backbone.View.extend({
  template: JST['post_form'],

  events: {
    'submit .post-form': 'submitForm'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  submitForm: function(event) {

    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON().post;
    this.model.set(data);
    this.model.save({}, {
      success: function() {
        if (this.collection) {
          this.collection.add(this.model, {merge: true});
        }
        Backbone.history.navigate('posts/'+this.model.get('id'), {trigger: true});
      }.bind(this),

      error: function (model, response) {
        this.render();
        this.$el.prepend($('<h1>' + response.responseText + '</h1>'));
      }.bind(this)

    });
  },

  render: function() {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  }
});
