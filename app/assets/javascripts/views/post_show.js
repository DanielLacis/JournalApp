window.JournalApp = (window.JournalApp || {});
window.JournalApp.Views = (window.JournalApp.Views || {} );

JournalApp.Views.PostsShow = Backbone.View.extend({
  template: JST['post_show'],

  events: {
    'dblclick .body, .title': 'targetEdit',
    'blur .body, .title': 'targetSubmit'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },

  targetEdit: function (event) {
    var editTarget = $(event.currentTarget).attr('class');
    var replacementString = '<input class="' + editTarget +
        '" type="text" value="' + this.model.escape(editTarget) + '">';
    $(event.currentTarget).replaceWith(replacementString);
    $("." + $(event.currentTarget).attr('class')).focus();
  },

  targetSubmit: function(event) {
    var editTarget = $(event.currentTarget).attr('class');
    var oldValue = this.model.get(editTarget);
    if (editTarget === 'title') {
      this.model.set({title: $(event.currentTarget).val()});
    } else if (editTarget === 'body') {
      this.model.set({body: $(event.currentTarget).val()});
    }
    this.model.save({}, {
      success: function() {
        Backbone.history.navigate('posts/' + this.model.get('id'), {trigger: true});
      }.bind(this),
      error: this.submitErrorCallback.bind(this)(editTarget, oldValue)
    });
  },

  submitErrorCallback: function (editTarget, oldValue) {
    if (editTarget === 'title') {
      this.model.set({title: oldValue});
    } else if (editTarget === 'body') {
      this.model.set({body: oldValue});
    }
    this.model.save();
    Backbone.history.navigate('posts/' + this.model.get('id'), {trigger: true});
  }

});
