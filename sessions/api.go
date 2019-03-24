package main

import (
	"net/http"
	"time"

	"github.com/juliotorresmoreno/unravel-server/helper"

	"github.com/gorilla/mux"
	"github.com/labstack/echo"
)

type Element struct {
	Key     string
	Value   string
	TimeOut int64
}

var put chan Element = make(chan Element)
var remove chan string = make(chan string)

var data = map[string]Element{}

func Listen() {
	for {
		select {
		case c := <-put:
			data[c.Key] = c
		case c := <-remove:
			delete(data, c)
		}
	}
}

func Get(c echo.Context) error {
	var vars = mux.Vars(c.Request())
	var id = vars["id"]

	if t, ok := data[id]; ok {
		return c.JSON(http.StatusOK, map[string]interface{}{
			"success": true,
			"value":   t.Value,
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"success": false,
	})
}

func Put(c echo.Context) error {
	var vars = mux.Vars(c.Request())
	var id = vars["id"]
	conf, err := readConfig()

	if err != nil {
		c.Logger().Warn(err)
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"success": false,
		})
	}

	params := helper.GetPostParams(c.Request())

	timeout := time.Now().Unix()
	put <- Element{
		Key:     id,
		Value:   params.Get("value"),
		TimeOut: timeout,
	}

	go func() {
		if t, ok := data[id]; ok {
			time.Sleep(conf.SessionDuration * time.Minute)
			if t.TimeOut == timeout {
				remove <- id
			}
		}
	}()

	return c.JSON(http.StatusOK, map[string]interface{}{
		"success": true,
	})
}

func Delete(c echo.Context) error {
	var vars = mux.Vars(c.Request())
	var id = vars["id"]

	remove <- id

	if t, ok := data[id]; ok {
		return c.JSON(http.StatusOK, map[string]interface{}{
			"success": true,
			"value":   t.Value,
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"success": false,
	})
}
