package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
	"github.com/labstack/echo/v4"
)

type TodoItem struct {
	Text string `json:"text" xml:"text" form:"text" query:"text"`
}

var d, _ = deta.New()

func main() {
	var port string
	if os.Getenv("PORT") != "" {
		port = os.Getenv("PORT")
	} else {
		port = "8080"
	}

	e := echo.New()

	e.GET("/", func(ctx echo.Context) error {
		html, err := os.ReadFile("./static/index.html")
		if err != nil {
			return ctx.String(http.StatusInternalServerError, "Internal Server Error")
		}
		return ctx.HTML(http.StatusOK, string(html))
	})

	e.GET("/api/todos", func(ctx echo.Context) error {
		// Connect to a Base for storing todo items.
		todos_base, err := base.New(d, "todos")
		if err != nil {
			return ctx.String(http.StatusInternalServerError, "Internal Server Error")
		}
		// Fetch all items from the Base.
		var todos []map[string]interface{}
		_, err = todos_base.Fetch(&base.FetchInput{Dest: &todos})
		if err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
			return ctx.String(http.StatusInternalServerError, "Internal Server Error")
		}
		// Return the items as JSON.
		return ctx.JSON(http.StatusOK, todos)
	})

	e.POST("/api/todos", func(ctx echo.Context) error {
		// Connect to a Base for storing todo items.
		todos_base, err := base.New(d, "todos")
		if err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
			return ctx.String(http.StatusInternalServerError, "Internal Server Error")
		}
		// Get the item from the request body.
		item := new(TodoItem)
		if err := ctx.Bind(item); err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
			return ctx.String(http.StatusInternalServerError, "Internal Server Error")
		}
		// Put the item into the Base.
		key, err := todos_base.Put(item)
		if err != nil {
			fmt.Fprintf(os.Stderr, "error: %v\n", err)
			return ctx.String(http.StatusInternalServerError, "Internal Server Error")
		}
		resp := map[string]string{
			"text": item.Text,
			"key": key,
		}
		// Return the response as JSON.
		return ctx.JSON(http.StatusCreated, resp)
	})

	fmt.Println("Server running on http://localhost:" + port)
	log.Fatal(e.Start(":" + port))
}
