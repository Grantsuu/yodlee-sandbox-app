package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"grant-tech-yodlee.com/types"
)

const (
	YodleeAuthTokenUrl   = "https://sandbox.api.yodlee.com/ysl/auth/token"
	YodleeAuthAPIVersion = "1.1"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.POST("/api/userToken", postUserToken)

	router.Run(":8080")
}

func postUserToken(c *gin.Context) {

	body := types.UserTokenRequest{}
	err := c.BindJSON(&body)
	if err != nil {
		log.Printf("error reading request body: %v\n", err)
		return
	}

	data := url.Values{}
	data.Add("clientId", body.ClientId)
	data.Add("secret", body.Secret)

	req, err := http.NewRequest(http.MethodPost, YodleeAuthTokenUrl, strings.NewReader(data.Encode()))
	if err != nil {
		log.Printf("error creating new request: %v\n", err)
		return
	}

	req.Header.Set("Api-Version", YodleeAuthAPIVersion)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("loginName", body.UserName)

	client := &http.Client{}

	res, err := client.Do(req)
	if err != nil {
		log.Printf("error sending http request: %v\n", err)
		return
	}

	responseBytes, err := io.ReadAll(res.Body)
	if err != nil {
		log.Printf("error reading http response: %v\n", err)
		return
	}
	res.Body.Close()

	userToken := types.UserTokenResponse{}

	err = json.Unmarshal(responseBytes, &userToken)
	if err != nil {
		log.Printf("error unmarshalling response bytes: %v\n", err)
		return
	}

	log.Printf("user token received: %v\n", userToken)
	c.IndentedJSON(http.StatusOK, userToken)
}
