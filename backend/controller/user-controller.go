package controller

import (
	"blog-backend/dto"
	"blog-backend/helper"
	"blog-backend/service"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// UserController is a contract about something that this controller can do
type UserController interface {
	Update(context *gin.Context)
	Profile(context *gin.Context)
	ProfileUserByID(context *gin.Context)
}

type userController struct {
	userService service.UserService
	jwtService  helper.JWTService
}

// NewUserController is creating anew instance of UserControlller
func NewUserController(userService service.UserService, jwtService helper.JWTService) UserController {
	return &userController{
		userService: userService,
		jwtService:  jwtService,
	}
}

func (uc *userController) Update(context *gin.Context) {
	var userUpdateDTO dto.UserUpdateDTO
	err := context.ShouldBind(&userUpdateDTO)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	authHeader := context.GetHeader("Authorization")
	token, err := uc.jwtService.ValidateToken(authHeader)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	id, err := strconv.ParseUint(fmt.Sprintf("%v", claims["user_id"]), 10, 64)
	if err != nil {
		panic(err.Error())
	}
	userUpdateDTO.ID = id
	u := uc.userService.Update(userUpdateDTO)
	response := helper.BuildResponse(true, "OK!", u)
	context.JSON(http.StatusOK, response)
}

func (uc *userController) Profile(context *gin.Context) {
	authHeader := context.GetHeader("Authorization")
	token, err := uc.jwtService.ValidateToken(authHeader)
	if err != nil {
		panic(err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["user_id"])
	user := uc.userService.Profile(id)
	response := helper.BuildResponse(true, "Get profile user successfully", user)
	context.JSON(http.StatusOK, response)

}

func (uc *userController) ProfileUserByID(context *gin.Context) {
	id := context.Param("id")
	user := uc.userService.Profile(id)
	response := helper.BuildResponse(true, "Get profile user successfully", user)
	context.JSON(http.StatusOK, response)
}
