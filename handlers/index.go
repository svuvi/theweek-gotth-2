package handlers

import (
	"net/http"

	"github.com/svuvi/theweek-gotth-2/ui/layouts"
)

func (h *BaseHandler) index(w http.ResponseWriter, r *http.Request) {
	layouts.Index().Render(r.Context(), w)
}