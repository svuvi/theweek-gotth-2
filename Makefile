.DEFAULT_GOAL := all

all: css templates build

css:
	npx @tailwindcss/cli -i ./input.css -o ./assets/static/style.css --minify

templates:
	templ generate

build:
	go build -o ./main.exe ./cmd/web

.PHONY: all css templates build