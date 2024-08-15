package service

import (
	"fmt"
	"log"

	"blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/repository"

	"github.com/mashingan/smapping"
)

type CommentService interface {
	Insert(comment dto.CommentCreateDTO) entity.Comment
	Update(comment dto.CommentUpdateDTO) entity.Comment
	Delete(comment entity.Comment)
	All() []entity.Comment
	FindByID(commentID uint64) entity.Comment
	FindCommentByPostID(postID uint64) []entity.Comment
	CountCommentByPostID(postID uint64) int64
	IsAllowedToEdit(userID string, commentId uint64) bool
}

type commentService struct {
	commentRepository repository.CommentRepository
}

func NewCommentService(commentRepository repository.CommentRepository) CommentService {
	return &commentService{
		commentRepository: commentRepository,
	}
}

func (service *commentService) Insert(comment dto.CommentCreateDTO) entity.Comment {
	commentToInsert := entity.Comment{}
	err := smapping.FillStruct(&commentToInsert, smapping.MapFields(&comment))
	if err != nil {
		log.Fatalf("Failed to map %v", err)
	}
	insertedComment := service.commentRepository.InsertComment(commentToInsert)
	return insertedComment
}

func (service *commentService) Update(comment dto.CommentUpdateDTO) entity.Comment {
	commentToUpdate := entity.Comment{}
	err := smapping.FillStruct(&commentToUpdate, smapping.MapFields(&comment))
	if err != nil {
		log.Fatalf("Failed to map %v", err)
	}
	updatedComment := service.commentRepository.UpdateComment(commentToUpdate)
	return updatedComment
}

func (service *commentService) Delete(comment entity.Comment) {
	commentToDelete := entity.Comment{}
	err := smapping.FillStruct(&commentToDelete, smapping.MapFields(&comment))
	if err != nil {
		log.Fatalf("Failed to map %v", err)
	}
	service.commentRepository.DeleteComment(commentToDelete)
}

func (service *commentService) All() []entity.Comment {
	return service.commentRepository.AllComment()
}

func (service *commentService) FindByID(commentID uint64) entity.Comment {
	return service.commentRepository.FindCommentByID(commentID)
}

func (service *commentService) FindCommentByPostID(postID uint64) []entity.Comment {
	return service.commentRepository.FindCommentByPostID(postID)
}

func (service *commentService) CountCommentByPostID(postID uint64) int64 {
	return service.commentRepository.CountCommentByPostID(postID)
}

func (service *commentService) IsAllowedToEdit(userID string, commentId uint64) bool {
	post := service.commentRepository.FindCommentByID(commentId)
	id := fmt.Sprintf("%v", post.UserID)
	return userID == id
}
