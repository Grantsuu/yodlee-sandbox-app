package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"
)

type GetUserToken struct {
	ClientId string `json:"clientId"`
	Secret   string `json:"secret"`
}

type AccountResponse struct {
	Name string `json:"name"`
}

func main() {
	router := gin.Default()
	router.GET("/accountInfo", getAccountInfo)

	router.Run("localhost:8080")
}

func getAccountInfo(c *gin.Context) {
	getAccessToken()
	c.IndentedJSON(http.StatusOK, AccountResponse{Name: "Grant"})

}

func getAccessToken() {
	data := url.Values{}
	data.Add("clientId", getEnvVariable("CLIENT_ID"))
	data.Add("secret", getEnvVariable("SECRET"))

	req, _ := http.NewRequest(http.MethodPost, "https://sandbox.api.yodlee.com/ysl/auth/token", strings.NewReader(data.Encode()))
	req.Header.Set("Api-Version", "1.1")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("loginName", getEnvVariable("USER_NAME"))

	client := &http.Client{}

	res, _ := client.Do(req)

	responseBody, _ := io.ReadAll(res.Body)
	res.Body.Close()

	fmt.Println(string(responseBody))
}

func getEnvVariable(key string) string {
	_ = godotenv.Load(".env.local")

	return os.Getenv(key)
}
