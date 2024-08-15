package repository

import (
	"blog-backend/entity"
	"log"

	"gorm.io/gorm"
)

type CommentRepository interface {
	InsertComment(comment entity.Comment) entity.Comment
	UpdateComment(comment entity.Comment) entity.Comment
	DeleteComment(comment entity.Comment)
	AllComment() []entity.Comment
	FindCommentByID(commentID uint64) entity.Comment
	FindCommentByPostID(postID uint64) []entity.Comment
	CountCommentByPostID(postID uint64) int64
}

type commentConnection struct {
	connection *gorm.DB
}

func NewCommentRepository(databaseConnection *gorm.DB) CommentRepository {
	return &commentConnection{
		connection: databaseConnection,
	}
}

func (db *commentConnection) InsertComment(comment entity.Comment) entity.Comment {
	log.Println(comment)
	err := db.connection.Save(&comment)
	if err != nil {
		log.Println(err)
	}
	err = db.connection.Preload("User").Find(&comment)
	if err != nil {
		log.Println(err)
	}
	err = db.connection.Preload("Post").Find(&comment)
	if err != nil {
		log.Println(err)
	}
	return comment
}

func (db *commentConnection) UpdateComment(comment entity.Comment) entity.Comment {
	db.connection.Save(&comment)
	db.connection.Preload("User").Preload("Post").Find(&comment)
	return comment
}

func (db *commentConnection) DeleteComment(comment entity.Comment) {
	err := db.connection.Delete(&comment)
	if err != nil {
		log.Println(err)
	}
}

func (db *commentConnection) AllComment() []entity.Comment {
	var comments []entity.Comment
	err := db.connection.Preload("Comment").Find(&comments)
	if err != nil {
		log.Println(err)
	}
	return comments
}

func (db *commentConnection) FindCommentByID(commentID uint64) entity.Comment {
	var comment entity.Comment
	err := db.connection.Preload("Post").Find(&comment, commentID)
	if err != nil {
		log.Println(err)
	}
	return comment
}

func (db *commentConnection) FindCommentByPostID(postID uint64) []entity.Comment {
	var comments []entity.Comment
	//db.connection.Preload("Post").Find(&comments, "post_id = ?", postID)
	err := db.connection.Where("post_id = ?", postID).Preload("User").Preload("Post").Find(&comments)
	if err != nil {
		log.Println(err)
	}
	return comments
}

func (db *commentConnection) CountCommentByPostID(postID uint64) int64 {
	var count int64
	db.connection.Model(&entity.Comment{}).Where("post_id = ?", postID).Count(&count)
	return count
}
