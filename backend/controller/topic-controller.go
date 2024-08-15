package controller

import (
	"net/http"
	"strconv"

	dto "blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/helper"
	"blog-backend/service"

	"github.com/gin-gonic/gin"
)

type TopicController interface {
	All(context *gin.Context)
	FindByID(context *gin.Context)
	Insert(context *gin.Context)
}

type topicController struct {
	topicService service.TopicService
	jwtService   helper.JWTService
}

func NewTopicController(topicServ service.TopicService, jwtServ helper.JWTService) TopicController {
	return &topicController{
		topicService: topicServ,
		jwtService:   jwtServ,
	}
}

func (c *topicController) All(context *gin.Context) {
	var topics []entity.Topic = c.topicService.All()
	response := helper.BuildResponse(true, "Get all topics successfully", topics)
	context.JSON(http.StatusOK, response)
}

func (c *topicController) FindByID(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	var topic entity.Topic = c.topicService.FindByID(id)
	if (topic == entity.Topic{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, res)
	} else {
		res := helper.BuildResponse(true, "Found topic", topic)
		context.JSON(http.StatusOK, res)
	}
}

func (c *topicController) Insert(context *gin.Context) {
	var topicCreateDTO dto.TopicCreateDTO
	err := context.BindJSON(&topicCreateDTO)
	if err != nil {
		response := helper.BuildErrorResponse("No param topic was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	} else {
		result := c.topicService.Insert(topicCreateDTO)
		response := helper.BuildResponse(true, "Insert topic sucessfully", result)
		context.JSON(http.StatusCreated, response)
	}
}
