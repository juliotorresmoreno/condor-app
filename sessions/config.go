package main

import (
	"encoding/json"
	"io/ioutil"
	"time"
)

type config struct {
	SessionDuration time.Duration `json:"session_duration"`
	Listen          string        `json:"listen"`
}

func readConfig() (config, error) {
	var err error
	var file []byte
	var conf = config{}

	file, err = ioutil.ReadFile("./config.json")

	if err != nil {
		return conf, err
	}

	err = json.Unmarshal(file, &conf)

	return conf, err
}
