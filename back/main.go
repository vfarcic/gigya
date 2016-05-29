package main

import (
	"gopkg.in/mgo.v2"
	"log"
	"net/http"
	"os"
)

var httpHandleFunc = http.HandleFunc
var logFatal = log.Fatal
var logPrintf = log.Printf
var httpListenAndServe = http.ListenAndServe
var coll *mgo.Collection

func main() {
	setupDb()
	RunServer()
}

func setupDb() {
	db := os.Getenv("DB")
	if len(db) == 0 {
		db = "localhost"
	}
	session, err := mgo.Dial(db)
	if err != nil {
		panic(err)
	}
	coll = session.DB("test").C("people")
}

func RunServer() {
	httpHandleFunc("/api/v1/login", LoginServer)
	logFatal("ListenAndServe: ", httpListenAndServe(":80", nil))
}

func LoginServer(w http.ResponseWriter, req *http.Request) {
	logPrintf("%s request to %s\n", req.Method, req.RequestURI)

	if req.Method == "PUT" {
		uid := req.URL.Query().Get("uuid")
		if _, err := upsertId(uid, &User{
			UID:           uid,
			Timestamp:     req.URL.Query().Get("timestamp"),
			Signature:     req.URL.Query().Get("signature"),
			Nickname:      req.URL.Query().Get("nickname"),
			LoginProvider: req.URL.Query().Get("loginProvider"),
		}); err != nil {
			panic(err)
		}
	}
}

type User struct {
	UID           string
	Timestamp     string
	Signature     string
	Nickname      string
	LoginProvider string
}

var upsertId = func(id interface{}, update interface{}) (info *mgo.ChangeInfo, err error) {
	return coll.UpsertId(id, update)
}
