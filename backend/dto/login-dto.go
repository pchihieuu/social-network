package dto

// LoginDTO is used when client post from /login endpoint
//LoginDTO is a model that used by client when POST from /login url
type LoginDTO struct {
	Email    string `json:"email" form:"email" binding:"required,email"`
	Password string `json:"password" form:"password" binding:"required"`
}
