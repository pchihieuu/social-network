package controller

import (
	"blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/helper"
	"blog-backend/service"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

type CommentController interface {
	All(context *gin.Context)
	FindByID(context *gin.Context)
	FindCommentByPostID(context *gin.Context)
	CountCommentByPostID(context *gin.Context)
	Insert(context *gin.Context)
	Update(context *gin.Context)
	Delete(context *gin.Context)
}

type commentController struct {
	commentService service.CommentService
	jwtService     helper.JWTService
}

func NewCommentController(commentService service.CommentService, jwtService helper.JWTService) CommentController {
	return &commentController{
		commentService: commentService,
		jwtService:     jwtService,
	}
}

func (c *commentController) All(context *gin.Context) {
	comments := c.commentService.All()
	response := helper.BuildResponse(true, "Get all comments successfully", comments)
	context.JSON(http.StatusOK, response)
}

func (c *commentController) FindByID(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	var comment entity.Comment = c.commentService.FindByID(id)
	if (comment == entity.Comment{}) {
		response := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, response)
	} else {
		response := helper.BuildResponse(true, "Found comment", comment)
		context.JSON(http.StatusOK, response)
	}

}

func (c *commentController) FindCommentByPostID(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	var comments []entity.Comment = c.commentService.FindCommentByPostID(id)
	if comments == nil {
		response := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, response)
	} else {
		response := helper.BuildResponse(true, "Found comments", comments)
		context.JSON(http.StatusOK, response)
	}

}

func (c *commentController) Insert(context *gin.Context) {
	var commentCreateDTO dto.CommentCreateDTO
	postId, err := strconv.ParseUint(context.Param("post_id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
		return
	}
	err2 := context.ShouldBind(&commentCreateDTO)
	if err2 != nil {
		response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		authHeader := context.GetHeader("Authorization")
		userID := c.getUserIDByToken(authHeader)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			commentCreateDTO.UserID = convertedUserID
			commentCreateDTO.PostID = postId
		}

		result := c.commentService.Insert(commentCreateDTO)
		response := helper.BuildResponse(true, "Insert comment successfully", result)
		context.JSON(http.StatusCreated, response)
	}
}

func (c *commentController) Update(context *gin.Context) {
	var commentUpdateDTO dto.CommentUpdateDTO
	err := context.ShouldBind(&commentUpdateDTO)
	if err != nil {
		res := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, res)
		return
	}
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	commentUpdateDTO.ID = id
	var comment entity.Comment = c.commentService.FindByID(id)
	authHeader := context.GetHeader("Authorization")
	token, err := c.jwtService.ValidateToken(authHeader)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	userID := fmt.Sprintf("%v", claims["user_id"])
	if c.commentService.IsAllowedToEdit(userID, commentUpdateDTO.ID) {
		id, errID := strconv.ParseUint(userID, 10, 64)
		if errID == nil {
			commentUpdateDTO.UserID = id
			commentUpdateDTO.PostID = comment.PostID
		}
		result := c.commentService.Update(commentUpdateDTO)
		response := helper.BuildResponse(true, "OK", result)
		context.JSON(http.StatusOK, response)
	} else {
		response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
		context.JSON(http.StatusForbidden, response)
	}
}

func (c *commentController) Delete(context *gin.Context) {
	var comment entity.Comment
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	comment.ID = id
	authHeader := context.GetHeader("Authorization")
	token, err := c.jwtService.ValidateToken(authHeader)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	userID := fmt.Sprintf("%v", claims["user_id"])
	if c.commentService.IsAllowedToEdit(userID, comment.ID) {
		c.commentService.Delete(comment)
		response := helper.BuildResponse(true, "Deleted", helper.EmptyObj{})
		context.JSON(http.StatusOK, response)
	} else {
		response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
		context.JSON(http.StatusForbidden, response)
	}
}

func (c *commentController) CountCommentByPostID(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	count := c.commentService.CountCommentByPostID(id)
	response := helper.BuildResponse(true, "Count comment successfully", count)
	context.JSON(http.StatusOK, response)
}

func (c *commentController) getUserIDByToken(token string) string {
	aToken, err := c.jwtService.ValidateToken(token)
	if err != nil {
		panic(err.Error())
	}
	claims := aToken.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["user_id"])
	return id
}
