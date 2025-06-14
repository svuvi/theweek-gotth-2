package handlers

import (
	"net/http"

	"github.com/svuvi/theweek-gotth-2/assets"
)

func (h *BaseHandler) NewRouter() http.Handler {
	mux := http.NewServeMux()

	mux.Handle("GET /static/", http.FileServerFS(assets.StaticFS))

	mux.HandleFunc("GET /{$}", h.index)

	return mux
}