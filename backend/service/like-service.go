package service

import (
	"log"

	"blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/repository"

	"github.com/mashingan/smapping"
)

type LikeService interface {
	Like(like dto.LikeDTO) entity.Like
	Unlike(like entity.Like)
	AllLike(postID uint64) []entity.Like
	CountLike(postID uint64) int
	IsLiked(userID uint64, postID uint64) bool
}

type likeService struct {
	likeRepository repository.LikeRepository
}

func NewLikeService(likeRepo repository.LikeRepository) LikeService {
	return &likeService{
		likeRepository: likeRepo,
	}
}

func (service *likeService) Like(like dto.LikeDTO) entity.Like {
	likeToSave := entity.Like{}
	err := smapping.FillStruct(&likeToSave, smapping.MapFields(&like))
	if err != nil {
		log.Fatalf("Failed map %v", err)
	}
	savedLike := service.likeRepository.Like(likeToSave)
	return savedLike
}

func (service *likeService) Unlike(like entity.Like) {
	likeToDelete := entity.Like{}
	err := smapping.FillStruct(&likeToDelete, smapping.MapFields(&like))
	if err != nil {
		log.Fatalf("Failed map %v", err)
	}
	service.likeRepository.Unlike(likeToDelete)
}

func (service *likeService) AllLike(postID uint64) []entity.Like {
	return service.likeRepository.AllLikes(postID)
}

func (service *likeService) CountLike(postID uint64) int {
	return service.likeRepository.CountLikes(postID)
}

func (service *likeService) IsLiked(userID uint64, postID uint64) bool {
	return service.likeRepository.IsLiked(userID, postID)
}
