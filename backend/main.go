package main

import (
	"context"
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

type key int

const (
	YodleeApiHostUrl               = "https://sandbox.api.yodlee.com/ysl/"
	YodleeAuthTokenPath            = "auth/token"
	YodleeVerifiedAccountsPath     = "verification/verifiedAccounts"
	YodleeAuthApiVersion           = "1.1"
	accessToken                key = iota
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.POST("/api/userToken", postUserToken)
	router.GET("/api/accounts", getAccountInformation)

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

	req, err := http.NewRequest(http.MethodPost, YodleeApiHostUrl+YodleeAuthTokenPath, strings.NewReader(data.Encode()))
	if err != nil {
		log.Printf("error creating new request: %v\n", err)
		return
	}

	req.Header.Set("Api-Version", YodleeAuthApiVersion)
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

	// Store the access token in the context
	c = context.WithValue(c, accessToken, userToken.Token.AccessToken).(*gin.Context)

	c.IndentedJSON(http.StatusOK, userToken)
}

func getAccountInformation(c *gin.Context) {

	req, err := http.NewRequest(http.MethodPost, YodleeApiHostUrl+YodleeVerifiedAccountsPath, nil)
	if err != nil {
		log.Printf("error creating new request: %v\n", err)
		return
	}

	q := req.URL.Query()
	q.Add("providerAccountId", c.Query("providerAccountId"))
	req.URL.RawQuery = q.Encode()

	yodlessAccessToken := c.Value(accessToken).(string)
	req.Header.Set("Api-Version", YodleeAuthApiVersion)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("loginName", "Bearer"+yodlessAccessToken)

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

	var accountInformation interface{}

	err = json.Unmarshal(responseBytes, &accountInformation)
	if err != nil {
		log.Printf("error unmarshalling response bytes: %v\n", err)
		return
	}

	c.IndentedJSON(http.StatusOK, accountInformation)
}
