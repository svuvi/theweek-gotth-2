package components

import (
	"bytes"
	"log"

	"github.com/yuin/goldmark"
)

func MDstringToHTML(md string) string {
	var buf bytes.Buffer
	if err := goldmark.Convert([]byte(md), &buf); err != nil {
		log.Println("Error when parsing markdown string:\n", err, "\nThe string:\n", md)
	}

	return buf.String()
}
