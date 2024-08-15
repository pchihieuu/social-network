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

type FollowerController interface {
	Follow(c *gin.Context)
	Unfollow(c *gin.Context)
	AllFollowers(c *gin.Context)
	AllFollowing(c *gin.Context)
	IsFollowing(c *gin.Context)
}

type followerController struct {
	followerService service.FollowService
	jwtService      helper.JWTService
}

// NewPostController create a new instances of PostController
func NewFollowerController(followerService service.FollowService, jwtServ helper.JWTService) FollowerController {
	return &followerController{
		followerService: followerService,
		jwtService:      jwtServ,
	}
}

// All is a function that get all followers of a user
func (controller *followerController) AllFollowers(context *gin.Context) {
	userId, err := strconv.ParseUint(context.Param("user_id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param user_id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	var followers []entity.Follower = controller.followerService.AllFollowers(userId)
	response := helper.BuildResponse(true, "Get all followers successfully", followers)
	context.JSON(http.StatusOK, response)
}

// AllFollowing is a function that get all following of a user
func (controller *followerController) AllFollowing(context *gin.Context) {
	userId, err := strconv.ParseUint(context.Param("user_id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param user_id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	var following []entity.Follower = controller.followerService.AllFollowing(userId)
	response := helper.BuildResponse(true, "Get all following successfully", following)
	context.JSON(http.StatusOK, response)
}

func (controller *followerController) Follow(context *gin.Context) {
	var followerFollowDTO dto.FollowDTO
	err := context.BindJSON(&followerFollowDTO)
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	} else {
		id := followerFollowDTO.FollowerID
		authHeader := context.GetHeader("Authorization")
		userID := controller.getUserIDByToken(authHeader)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			followerFollowDTO.FollowerID = convertedUserID
			followerFollowDTO.UserID = id
		}
		result := controller.followerService.Follow(followerFollowDTO)
		response := helper.BuildResponse(true, "Followed successfully", result)
		context.JSON(http.StatusCreated, response)
	}

}

func (controller *followerController) Unfollow(context *gin.Context) {
	var follower entity.Follower
	//err := context.BindJSON(&follower)
	//log.Println(follower)
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		follower.UserID = id
	}
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	authHeader := context.GetHeader("Authorization")
	userID := controller.getUserIDByToken(authHeader)
	convertedUserID, err := strconv.ParseUint(userID, 10, 64)
	if err == nil {
		follower.FollowerID = convertedUserID
		log.Println(follower)
		controller.followerService.UnFollow(follower)
		response := helper.BuildResponse(true, "Unfollowed successfully", helper.EmptyObj{})
		context.JSON(http.StatusOK, response)
	}
	if err != nil {
		fmt.Sprintf("%v", err.Error())
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)

		controller.followerService.UnFollow(follower)
		res := helper.BuildResponse(true, "Unfollowed successfully", helper.EmptyObj{})
		context.JSON(http.StatusOK, res)
	}
}

func (controller *followerController) getUserIDByToken(token string) string {
	aToken, err := controller.jwtService.ValidateToken(token)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := aToken.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["user_id"])
	return id
}

func (controller *followerController) IsFollowing(context *gin.Context) {
	var follower entity.Follower
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		follower.UserID = id
	}
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	authHeader := context.GetHeader("Authorization")
	userID := controller.getUserIDByToken(authHeader)
	convertedUserID, err := strconv.ParseUint(userID, 10, 64)
	if err == nil {
		follower.FollowerID = convertedUserID
		log.Println(follower)
		result := controller.followerService.IsFollowing(follower.UserID, follower.FollowerID)
		if result {
			response := helper.BuildResponse(true, "Following", result)
			context.JSON(http.StatusOK, response)
		} else {
			response := helper.BuildResponse(true, "Not following", result)
			context.JSON(http.StatusOK, response)
		}
	}
	if err != nil {
		fmt.Sprintf("%v", err.Error())
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)

		result := controller.followerService.IsFollowing(follower.UserID, follower.FollowerID)
		response = helper.BuildResponse(true, "Is following successfully", result)
		context.JSON(http.StatusOK, response)
	}
}
