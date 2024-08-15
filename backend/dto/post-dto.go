package dto

import "mime/multipart"

//PostUpdateDTO is a model that client use when updating a post
type PostUpdateDTO struct {
	ID          uint64 `json:"id,omitempty" form:"id,omitempty"`
	Title       string `json:"title" form:"title" binding:"required"`
	Description string `json:"description" form:"description" binding:"required"`
	UserID      uint64 `json:"user_id,omitempty" form:"user_id,omitempty"`
	TopicID     uint64 `json:"topic_id,omitempty" form:"topic_id,omitempty"`

	//File        *multipart.FileHeader `json:"file,omitempty" form:"file,omitempty"`

	//PhotoUrl    string   `json:"photo_url" form:"photo_url" binding:"required"`
	//Photo  *multipart.FileHeader `json:"photo" form:"photo"`
}

// PostCreateDTO is used by client when POST create new post
type PostCreateDTO struct {
	Title       string                `json:"title" form:"title" binding:"required"`
	Description string                `json:"description" form:"description" binding:"required"`
	UserID      uint64                `json:"user_id,omitempty" form:"user_id,omitempty"`
	TopicID     uint64                `json:"topic_id,omitempty" form:"topic_id,omitempty"`
	File        *multipart.FileHeader `json:"file" form:"file"`
	ImagePath   string                `json:"image_path,omitempty" form:"image_path,omitempty"`
	//File        *multipart.FileHeader

	//PhotoUrl    string   `json:"photo_url" form:"photo_url" binding:"required"`
	//Photo  *multipart.FileHeader `json:"photo" form:"photo"`
}
