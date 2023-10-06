package types

type UserTokenRequest struct {
	ClientId string `json:"clientId" binding:"required"`
	Secret   string `json:"secret" binding:"required"`
	UserName string `json:"userName" binding:"required"`
}

type UserToken struct {
	AccessToken string `json:"accessToken"`
	IssuedAt    string `json:"issuedAt"`
	ExpiresIn   int    `json:"expiresIn"`
}

type UserTokenResponse struct {
	Token UserToken `json:"token"`
}

type AccountResponse struct {
	Name string `json:"name"`
}
