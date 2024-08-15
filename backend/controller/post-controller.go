package controller

import (
	"blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/helper"
	"blog-backend/pagination"
	"blog-backend/service"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

// PostController is a contract about something that this controller can do
type PostController interface {
	All(context *gin.Context)
	GetAll(context *gin.Context)
	FindByID(context *gin.Context)
	FindByTopicID(context *gin.Context)
	Insert(context *gin.Context)
	Update(context *gin.Context)
	Delete(context *gin.Context)
	GetTrendingPosts(context *gin.Context)
	GetFollowingPosts(context *gin.Context)
	GetPostsFromSubscribedTopic(context *gin.Context)
	GetTopicOfPost(context *gin.Context)
	SearchPosts(context *gin.Context)
	Home(context *gin.Context)
}

type postController struct {
	postService      service.PostService
	likeService      service.LikeService
	followService    service.FollowService
	subscribeService service.SubscribeService
	topicService     service.TopicService
	jwtService       helper.JWTService
}

// NewPostController create a new instances of PostController
func NewPostController(postServ service.PostService, jwtServ helper.JWTService, likeServ service.LikeService, followerServ service.FollowService, subscribeServ service.SubscribeService, topicServ service.TopicService) PostController {
	return &postController{
		postService:      postServ,
		likeService:      likeServ,
		followService:    followerServ,
		subscribeService: subscribeServ,
		jwtService:       jwtServ,
	}
}

func (c *postController) GetAll(context *gin.Context) {
	var posts []entity.Post = c.postService.GetAll()
	response := helper.BuildResponse(true, "Get all posts successfully", posts)
	context.JSON(http.StatusOK, response)
}

func (c *postController) All(context *gin.Context) {
	pagination := pagination.GeneratePaginationFromRequest(context)
	var posts []entity.Post = c.postService.All(pagination)
	response := helper.BuildResponse(true, "Get all posts successfully", posts)
	context.JSON(http.StatusOK, response)
}

func (c *postController) FindByID(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	var post entity.Post = c.postService.FindByID(id)
	if (post == entity.Post{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, res)
	} else {
		res := helper.BuildResponse(true, "Found post", post)
		context.JSON(http.StatusOK, res)
	}
}

func (c *postController) FindByTopicID(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}
	log.Println("id: ", id)

	var posts []entity.Post = c.postService.FindByTopicID(id)
	response := helper.BuildResponse(true, "Get all posts successfully", posts)
	context.JSON(http.StatusOK, response)
}

func (c *postController) Insert(context *gin.Context) {
	var postCreateDTO dto.PostCreateDTO
	err := context.ShouldBind(&postCreateDTO)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	} else {
		authHeader := context.GetHeader("Authorization")
		userID := c.getUserIDByToken(authHeader)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			postCreateDTO.UserID = convertedUserID
		}

		//Handle file upload
		file, err := context.FormFile("file")
		if err != nil {
			response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
			context.JSON(http.StatusBadRequest, response)
			return
		}
		fileType := file.Header.Get("Content-Type")
		if !isAllowedFileTypes(fileType) {
			response := helper.BuildErrorResponse("Failed to process request", "File type is not allowed", helper.EmptyObj{})
			context.JSON(http.StatusBadRequest, response)
		}

		postCreateDTO.File = file
		err = context.SaveUploadedFile(postCreateDTO.File, photoPath+postCreateDTO.File.Filename)
		if err != nil {
			response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
			context.JSON(http.StatusBadRequest, response)
			return
		}
		postCreateDTO.ImagePath = photoPath + postCreateDTO.File.Filename

		result := c.postService.Insert(postCreateDTO)
		response := helper.BuildResponse(true, "Insert post sucessfully", result)
		context.JSON(http.StatusCreated, response)
	}
}

func (c *postController) Update(context *gin.Context) {
	var postUpdateDTO dto.PostUpdateDTO
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	var post entity.Post = c.postService.FindByID(id)
	if (post == entity.Post{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, res)
	} else {

		err := context.ShouldBind(&postUpdateDTO)
		if err != nil {
			res := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
			context.JSON(http.StatusBadRequest, res)
			return
		}

		authHeader := context.GetHeader("Authorization")
		token, err := c.jwtService.ValidateToken(authHeader)
		if err != nil {
			fmt.Sprintf("%v", err.Error())
		}
		postUpdateDTO.ID = id
		claims := token.Claims.(jwt.MapClaims)
		userID := fmt.Sprintf("%v", claims["user_id"])
		if c.postService.IsAllowedToEdit(userID, postUpdateDTO.ID) {
			id, errID := strconv.ParseUint(userID, 10, 64)
			if errID == nil {
				postUpdateDTO.UserID = id
			}
			log.Println(postUpdateDTO)
			result := c.postService.Update(postUpdateDTO)
			response := helper.BuildResponse(true, "OK", result)
			context.JSON(http.StatusOK, response)
		} else {
			response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
			context.JSON(http.StatusForbidden, response)
		}
	}

}

func (c *postController) Delete(context *gin.Context) {
	var post entity.Post
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	post.ID = id
	authHeader := context.GetHeader("Authorization")
	token, err := c.jwtService.ValidateToken(authHeader)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	userID := fmt.Sprintf("%v", claims["user_id"])
	if c.postService.IsAllowedToEdit(userID, post.ID) {
		c.postService.Delete(post)
		res := helper.BuildResponse(true, "Deleted", helper.EmptyObj{})
		context.JSON(http.StatusOK, res)
	} else {
		response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
		context.JSON(http.StatusForbidden, response)
	}
}

func (c *postController) getUserIDByToken(token string) string {
	aToken, err := c.jwtService.ValidateToken(token)
	if err != nil {
		panic(err.Error())
	}
	claims := aToken.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["user_id"])
	return id
}
func (c *postController) GetTrendingPosts(context *gin.Context) {
	var posts []entity.Post = c.postService.GetAll()
	var trendingPosts []entity.Post
	for _, post := range posts {
		post.LikesCount = c.likeService.CountLike(post.ID)
		if post.LikesCount >= 1 {
			trendingPosts = append(trendingPosts, post)
		}
	}
	response := helper.BuildResponse(true, "Get all trending posts successfully", trendingPosts)
	context.JSON(http.StatusOK, response)
}

func (c *postController) GetFollowingPosts(context *gin.Context) {
	var posts []entity.Post = c.postService.GetAll()
	var followingPosts []entity.Post
	authHeader := context.GetHeader("Authorization")
	token, err := c.jwtService.ValidateToken(authHeader)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	UserID := fmt.Sprintf("%v", claims["user_id"])
	UserIDInt, err := strconv.ParseUint(UserID, 10, 64)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	var followingUser []entity.Follower = c.followService.AllFollowing(UserIDInt)
	for _, follower := range followingUser {
		for _, post := range posts {
			if post.UserID == follower.UserID {
				followingPosts = append(followingPosts, post)
			}
		}
	}
	response := helper.BuildResponse(true, "Get all following posts successfully", followingPosts)
	context.JSON(http.StatusOK, response)
}

func (c *postController) GetPostsFromSubscribedTopic(context *gin.Context) {
	var posts []entity.Post = c.postService.GetAll()
	var subscribedTopicPosts []entity.Post
	authHeader := context.GetHeader("Authorization")
	token, err := c.jwtService.ValidateToken(authHeader)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
		return
	}
	claims := token.Claims.(jwt.MapClaims)
	UserID := fmt.Sprintf("%v", claims["user_id"])
	UserIDInt, err := strconv.ParseUint(UserID, 10, 64)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
		return
	}
	var subscribedTopics []entity.Subscribe = c.subscribeService.AllSubscribesByUser(UserIDInt)
	for _, subscribedTopic := range subscribedTopics {
		for _, post := range posts {
			if post.TopicID == subscribedTopic.TopicID {
				subscribedTopicPosts = append(subscribedTopicPosts, post)
			}
		}
	}
	response := helper.BuildResponse(true, "Get all subscribed topic posts successfully", subscribedTopicPosts)
	context.JSON(http.StatusOK, response)
}

func (c *postController) SearchPosts(context *gin.Context) {
	//pagination := pagination.GeneratePaginationFromRequest(context)
	//var posts []entity.Post = c.postService.All(pagination)
	var searchedPosts []entity.Post
	var searchTerm string
	searchTerm = context.Query("search")
	log.Println(searchTerm)

	//for _, post := range posts {
	//	if strings.Contains(post.Title, searchTerm) {
	//		searchedPosts = append(searchedPosts, post)
	//	}
	//}
	searchedPosts = c.postService.SearchPosts(searchTerm)
	response := helper.BuildResponse(true, "Get all searched posts successfully", searchedPosts)
	context.JSON(http.StatusOK, response)
}

func (c *postController) GetTopicOfPost(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to get the id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	var post entity.Post = c.postService.FindByID(id)
	if (post == entity.Post{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, res)
	} else {
		var topic entity.Topic = c.topicService.FindByID(post.TopicID)
		topic = c.topicService.FindByID(post.TopicID)
		response := helper.BuildResponse(true, "Get topic of post successfully", topic)
		context.JSON(http.StatusOK, response)
	}

}

func (c *postController) Home(context *gin.Context) {
	var homePosts []entity.Post
	var followingPosts []entity.Post
	var trendingPosts []entity.Post
	var subscribedTopicPosts []entity.Post
	pagination := pagination.GeneratePaginationFromRequest(context)
	var posts []entity.Post = c.postService.All(pagination)
	authHeader := context.GetHeader("Authorization")
	token, err := c.jwtService.ValidateToken(authHeader)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	UserID := fmt.Sprintf("%v", claims["user_id"])
	UserIDInt, err := strconv.ParseUint(UserID, 10, 64)
	if err != nil {
		fmt.Sprintf("%v", err.Error())
	}
	var followingUser []entity.Follower = c.followService.AllFollowing(UserIDInt)
	for _, follower := range followingUser {
		for _, post := range posts {
			if post.UserID == follower.UserID {
				followingPosts = append(followingPosts, post)
			}
		}
	}
	var subscribedTopics []entity.Subscribe = c.subscribeService.AllSubscribesByUser(UserIDInt)
	for _, subscribedTopic := range subscribedTopics {
		for _, post := range posts {
			if post.TopicID == subscribedTopic.TopicID {
				subscribedTopicPosts = append(subscribedTopicPosts, post)
			}
		}
	}

	for _, post := range posts {
		post.LikesCount = c.likeService.CountLike(post.ID)
		if post.LikesCount >= 1 {
			trendingPosts = append(trendingPosts, post)
		}
	}
	homePosts = append(homePosts, followingPosts...)
	homePosts = append(homePosts, subscribedTopicPosts...)
	homePosts = append(homePosts, trendingPosts...)
	response := helper.BuildResponse(true, "Get all posts successfully", homePosts)
	context.JSON(http.StatusOK, response)
}

var (
	photoPath        = "static/"
	allowedFileTypes = []string{
		"image/png",
		"image/jpeg",
		"image/gif",
	}
)

func isAllowedFileTypes(fileType string) bool {
	for _, value := range allowedFileTypes {
		if fileType == value {
			return true
		}
	}
	return false
}
