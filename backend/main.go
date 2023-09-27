package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"grant-tech-yodlee.com/types"
)

const (
	YodleeAuthTokenUrl   = "https://sandbox.api.yodlee.com/ysl/auth/token"
	YodleeAuthAPIVersion = "1.1"
)

func main() {
	router := gin.Default()
	router.GET("/api/accountInfo", getAccountInfo)

	router.Run("localhost:8080")
}

func getAccountInfo(c *gin.Context) {
	res, _ := getUserToken()
	c.IndentedJSON(http.StatusOK, res)

}

func getUserToken() (interface{}, error) {
	data := url.Values{}
	data.Add("clientId", getEnvVariable("CLIENT_ID"))
	data.Add("secret", getEnvVariable("SECRET"))

	req, err := http.NewRequest(http.MethodPost, YodleeAuthTokenUrl, strings.NewReader(data.Encode()))
	if err != nil {
		log.Printf("error creating new request: %v\n", err)
		return nil, err
	}

	req.Header.Set("Api-Version", YodleeAuthAPIVersion)
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("loginName", getEnvVariable("USER_NAME"))

	client := &http.Client{}

	res, err := client.Do(req)
	if err != nil {
		log.Printf("error sending http request: %v\n", err)
		return nil, err
	}

	responseBytes, err := io.ReadAll(res.Body)
	if err != nil {
		log.Printf("error reading http response: %v\n", err)
		return nil, err
	}
	res.Body.Close()

	userToken := types.UserToken{}

	err = json.Unmarshal(responseBytes, &userToken)
	if err != nil {
		log.Printf("error unmarshalling response bytes: %v\n", err)
		return nil, err
	}

	log.Printf("user token received: %v\n", userToken)
	return userToken, nil
}

func getEnvVariable(key string) string {
	_ = godotenv.Load(".env.local")

	return os.Getenv(key)
}
