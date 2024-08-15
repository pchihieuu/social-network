package dto

type TopicUpdateDTO struct {
	ID   uint64 `json:"id" form:"id"`
	Name string `json:"name" form:"name" binding:"required"`
}

type TopicCreateDTO struct {
	Name string `json:"name" form:"name" binding:"required"`
}
