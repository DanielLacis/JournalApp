Rails.application.routes.draw do
  root 'static_pages#root'
  resources(
    :posts,
    defaults: {format: :json},
    only: [:create, :index, :show, :destroy, :update]
  )
  # resources 'posts', only: :create
end
