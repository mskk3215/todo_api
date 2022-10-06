class TasksController < ApplicationController

  def index
    tasks = Task.all
    # 完全なレスポンスを作成してブラウザに送信
    render json: tasks 
  end

  def createw
    Task.create(task_params)
    head :created
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    # httpヘッダのみのレスポンスを作成してブラウザに送信
    head :ok
  
  end

  def update
    task= Task.find(params[:id])
    task.update(task_params)
    head :ok
  end

  private
  
  def task_params
    params.permit(:name, :is_done)
  end
end