package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/svuvi/theweek-gotth-2/handlers"
	"github.com/svuvi/theweek-gotth-2/middleware"
)

func main() {
	router := handlers.NewBaseHandler().NewRouter()
	routerWrapped := middleware.NewLogger(router)

	server := http.Server{
		Addr: ":8080",
		Handler: routerWrapped,
		ReadTimeout: time.Second * 10,
		WriteTimeout: time.Second * 10,
	}

	fmt.Printf("Listening on http://localhost%v\n", server.Addr)
	server.ListenAndServe()
}