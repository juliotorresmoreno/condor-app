package main

import (
	"log"

	"github.com/labstack/echo"
)

func main() {
	conf, err := readConfig()

	if err != nil {
		log.Fatalln(err)
	}

	e := echo.New()

	e.GET("/:id", Get)
	e.PUT("/:id", Put)
	e.POST("/:id", Put)
	e.DELETE("/:id", Delete)

	go Listen()

	e.Start(conf.Listen)
}
