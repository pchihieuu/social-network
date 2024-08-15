package controller

import (
	"blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/helper"
	"blog-backend/service"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

type LikeController interface {
	Like(context *gin.Context)
	UnLike(context *gin.Context)
	AllLikes(context *gin.Context)
	CountLikes(context *gin.Context)
	IsLiked(context *gin.Context)
}

type likeController struct {
	likeService service.LikeService
	jwtService  helper.JWTService
}

func NewLikeController(likeService service.LikeService, jwtService helper.JWTService) LikeController {
	return &likeController{
		likeService: likeService,
		jwtService:  jwtService,
	}
}

func (controller *likeController) Like(context *gin.Context) {
	var likeDTO dto.LikeDTO
	err := context.ShouldBind(&likeDTO)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		authHeader := context.GetHeader("Authorization")
		userID := controller.getUserIDByToken(authHeader)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			likeDTO.UserID = convertedUserID
		}
		result := controller.likeService.Like(likeDTO)
		response := helper.BuildResponse(true, "Like sucessfully", result)
		context.JSON(http.StatusCreated, response)
	}
}

func (controller *likeController) UnLike(context *gin.Context) {
	var like entity.Like

	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		like.PostID = id
		authHeader := context.GetHeader("Authorization")
		userID := controller.getUserIDByToken(authHeader)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			like.UserID = convertedUserID
			controller.likeService.Unlike(like)
			response := helper.BuildResponse(true, "Unlike successfully", helper.EmptyObj{})
			context.JSON(http.StatusOK, response)
		}
		if err != nil {
			fmt.Sprintf("%v", err.Error())
			response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
			context.JSON(http.StatusBadRequest, response)
		}
	}

}

func (controller *likeController) AllLikes(context *gin.Context) {
	var like entity.Like
	var likes []entity.Like

	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	like.PostID = id
	likes = controller.likeService.AllLike(like.PostID)
	response := helper.BuildResponse(true, "Get all likes successfully", likes)
	context.JSON(http.StatusOK, response)
}

func (controller *likeController) CountLikes(context *gin.Context) {
	var numlikes int
	var like entity.Like

	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		like.PostID = id
		numlikes = controller.likeService.CountLike(like.PostID)
		response := helper.BuildResponse(true, "Count likes successfully", numlikes)
		context.JSON(http.StatusOK, response)
	}

}

func (controller *likeController) getUserIDByToken(token string) string {
	aToken, err := controller.jwtService.ValidateToken(token)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := aToken.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["user_id"])
	return id
}

func (controller *likeController) IsLiked(context *gin.Context) {
	var like entity.Like

	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		like.PostID = id
		authHeader := context.GetHeader("Authorization")
		userID := controller.getUserIDByToken(authHeader)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			like.UserID = convertedUserID
			isLiked := controller.likeService.IsLiked(like.UserID, like.PostID)
			log.Println(isLiked)
			log.Println(like.UserID)
			log.Println(like.PostID)
			if isLiked {
				response := helper.BuildResponse(true, "User liked this post", isLiked)
				context.JSON(http.StatusOK, response)
			} else {
				response := helper.BuildResponse(true, "User don't like this post", isLiked)
				context.JSON(http.StatusOK, response)
			}
		}
		if err != nil {
			fmt.Sprintf("%v", err.Error())
			response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
			context.JSON(http.StatusBadRequest, response)
		}
	}

}
