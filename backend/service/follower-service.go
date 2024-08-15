package service

import (
	"log"

	"blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/repository"

	"github.com/mashingan/smapping"
)

type FollowService interface {
	Follow(follower dto.FollowDTO) entity.Follower
	UnFollow(follower entity.Follower)
	AllFollowers(userID uint64) []entity.Follower
	AllFollowing(userID uint64) []entity.Follower
	IsFollowing(userID uint64, followerID uint64) bool
}

type followerService struct {
	followerRepository repository.FollowerRepository
}

func NewFollowService(followerRepo repository.FollowerRepository) FollowService {
	return &followerService{
		followerRepository: followerRepo,
	}
}

// Follow is a function that will follow a user
func (service *followerService) Follow(follower dto.FollowDTO) entity.Follower {
	followerToFollow := entity.Follower{}
	err := smapping.FillStruct(&followerToFollow, smapping.MapFields(&follower))
	if err != nil {
		log.Fatalf("Failed map %v", err)
	}
	followedFollower := service.followerRepository.Follow(followerToFollow)
	return followedFollower
}

// UnFollow is a function that will unfollow a user
func (service *followerService) UnFollow(follower entity.Follower) {
	service.followerRepository.Unfollow(follower)
}

// AllFollowers is a function that will return all followers of a user
func (service *followerService) AllFollowers(userID uint64) []entity.Follower {
	return service.followerRepository.AllFollower(userID)
}

// AllFollowing is a function that will return all users that a user is following
func (service *followerService) AllFollowing(userID uint64) []entity.Follower {
	return service.followerRepository.AllFollowing(userID)
}

func (service *followerService) IsFollowing(userID uint64, followerID uint64) bool {
	return service.followerRepository.IsFollowing(userID, followerID)
}
