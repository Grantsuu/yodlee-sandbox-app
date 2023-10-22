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
	YodleeApiHostUrl           = "https://sandbox.api.yodlee.com/ysl/"
	YodleeAuthTokenPath        = "auth/token"
	YodleeVerifiedAccountsPath = "verification/verifiedAccounts"
	YodleeProviderAccountsPath = "providerAccounts"
	YodleeAccountsPath         = "accounts"
	YodleeAuthApiVersion       = "1.1"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	yodlee := YodleeSandbox{}

	router.POST("/api/userToken", yodlee.postUserToken)
	router.GET("/api/accountInformation", yodlee.getAccountInformation)
	router.PUT("/api/refreshAccount", yodlee.putRefreshAccount)
	router.GET("/api/accountBalance", yodlee.getAccountBalance)

	router.Run(":8080")
}

type YodleeSandbox struct {
	AccessToken string
}

func (y *YodleeSandbox) postUserToken(c *gin.Context) {

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
	y.AccessToken = userToken.Token.AccessToken

	c.IndentedJSON(http.StatusOK, userToken)
}

func (y *YodleeSandbox) getAccountInformation(c *gin.Context) {

	req, err := http.NewRequest(http.MethodGet, YodleeApiHostUrl+YodleeVerifiedAccountsPath, nil)
	if err != nil {
		log.Printf("error creating new request: %v\n", err)
		return
	}

	q := req.URL.Query()
	q.Add("providerAccountId", c.Query("providerAccountId"))
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Api-Version", YodleeAuthApiVersion)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+y.AccessToken)

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

func (y *YodleeSandbox) putRefreshAccount(c *gin.Context) {
	req, err := http.NewRequest(http.MethodPut, YodleeApiHostUrl+YodleeProviderAccountsPath, nil)
	if err != nil {
		log.Printf("error creating new request: %v\n", err)
		return
	}

	q := req.URL.Query()
	q.Add("providerAccountId", c.Query("providerAccountId"))
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Api-Version", YodleeAuthApiVersion)
	req.Header.Set("Content-Type", "application/vnd.yodlee+json")
	req.Header.Set("Authorization", "Bearer "+y.AccessToken)

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

	var providerAccount interface{}

	err = json.Unmarshal(responseBytes, &providerAccount)
	if err != nil {
		log.Printf("error unmarshalling response bytes: %v\n", err)
		return
	}

	c.IndentedJSON(http.StatusOK, providerAccount)
}

func (y *YodleeSandbox) getAccountBalance(c *gin.Context) {
	req, err := http.NewRequest(http.MethodGet, YodleeApiHostUrl+YodleeAccountsPath, nil)
	if err != nil {
		log.Printf("error creating new request: %v\n", err)
		return
	}

	q := req.URL.Query()
	q.Add("providerAccountId", c.Query("providerAccountId"))
	q.Add("accountId", c.Query("accountId"))
	req.URL.RawQuery = q.Encode()

	req.Header.Set("Api-Version", YodleeAuthApiVersion)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+y.AccessToken)

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

	var accountBalance interface{}

	err = json.Unmarshal(responseBytes, &accountBalance)
	if err != nil {
		log.Printf("error unmarshalling response bytes: %v\n", err)
		return
	}

	c.IndentedJSON(http.StatusOK, accountBalance)
}
