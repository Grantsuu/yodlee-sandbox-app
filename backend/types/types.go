package types

type UserTokenInner struct {
	AccessToken string `json:"accessToken"` //"accessToken": "6xsYC6VnqkGazKAam3WhbwigalNN",
	IssuedAt    string `json:"issuedAt"`    //"issuedAt": "2020-05-08T22:33:45Z",
	ExpiresIn   int    `json:"expiresIn"`   //"expiresIn": 1799
}

type UserToken struct {
	Token UserTokenInner `json:"token"`
}

type AccountResponse struct {
	Name string `json:"name"`
}
