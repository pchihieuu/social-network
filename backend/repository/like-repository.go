package repository

import (
	"blog-backend/entity"
	"log"

	"gorm.io/gorm"
)

type LikeRepository interface {
	Like(like entity.Like) entity.Like
	Unlike(like entity.Like)
	AllLikes(postID uint64) []entity.Like
	CountLikes(postID uint64) int
	IsLiked(userID uint64, postID uint64) bool
}

type likeConnection struct {
	connection *gorm.DB
}

func NewLikeRepository(databaseConnection *gorm.DB) LikeRepository {
	return &likeConnection{
		connection: databaseConnection,
	}
}

func (db *likeConnection) Like(like entity.Like) entity.Like {
	err := db.connection.Save(&like)
	if err != nil {
		log.Println(err)
	}
	db.connection.Preload("User").Find(&like)
	return like
}

func (db *likeConnection) Unlike(like entity.Like) {
	err := db.connection.Where("post_id = ? AND user_id = ?", like.PostID, like.UserID).Delete(&like)
	if err != nil {
		log.Println(err)
	}
	db.connection.Preload("User").Find(&like)
}

func (db *likeConnection) AllLikes(postID uint64) []entity.Like {
	var likes []entity.Like
	err := db.connection.Preload("User").Find(&likes, "post_id = ?", postID)
	if err != nil {
		log.Println(err)
	}
	return likes
}

func (db *likeConnection) CountLikes(postID uint64) int {
	var likes []entity.Like
	err := db.connection.Preload("Like").Find(&likes, "post_id = ?", postID)
	if err != nil {
		log.Println(err)
	}
	return len(likes)
}

func (db *likeConnection) IsLiked(userID uint64, postID uint64) bool {
	var like entity.Like
	db.connection.Preload("User").Find(&like, "user_id = ? AND post_id = ?", userID, postID)
	return like.ID != 0

}