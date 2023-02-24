from deta import Base
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel  # pylint: disable=no-name-in-module

app = FastAPI()
# Connect to a Base for storing todo items.
todos_base = Base("todos")


class TodoItem(BaseModel):
    text: str


@app.get("/")
async def index():
    with open("./static/index.html") as file:
        return HTMLResponse(file.read())


@app.get("/api/todos")
async def get_todos():
    # Fetch all items from the Base.
    todos = todos_base.fetch()
    # Return the items as JSON.
    return todos.items


@app.post("/api/todos", status_code=201)
async def add_todo(item: TodoItem):
    # Put the item into the Base.
    resp = todos_base.put(item.dict())
    # Return the response as JSON.
    return resp
