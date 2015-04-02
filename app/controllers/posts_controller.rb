class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422 #unprocessible entity

    end
  end

  def show
    @post = Post.find(params[:id])
    if @post
      render json: @post
    else
      render json: {error: 'post not found'}, status: 404
    end
  end

  def index
    @posts = Post.all
    render json: @posts
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render json: @post
    else
      render json: {error: 'post was not found'}, status: 404
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages.join(', '), status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
