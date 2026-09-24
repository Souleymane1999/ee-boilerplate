class TodosController < ApplicationController
  before_action :authenticate_user!
  before_action :set_todo, only: %i[show edit update destroy]

  def index
    @todos = policy_scope(Todo).order(created_at: :desc)
  end

  def show
    authorize @todo
  end

  def new
    @todo = current_user.todos.build
    authorize @todo
  end

  def edit
    authorize @todo
  end

  def create
    @todo = current_user.todos.build(todo_params)
    authorize @todo

    if @todo.save
      redirect_to @todo, notice: 'Tâche créée.'
    else
      render :new, status: :unprocessable_content
    end
  end

  def update
    authorize @todo

    if @todo.update(todo_params)
      redirect_to @todo, notice: 'Tâche mise à jour.', status: :see_other
    else
      render :edit, status: :unprocessable_content
    end
  end

  def destroy
    authorize @todo
    @todo.destroy!
    redirect_to todos_url, notice: 'Tâche supprimée.', status: :see_other
  end

  private

  def set_todo
    @todo = Todo.find(params[:id])
  end

  def todo_params
    params.require(:todo).permit(:title, :done)
  end
end
