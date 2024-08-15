package service

import (
	"log"

	"blog-backend/dto"
	"blog-backend/entity"
	"blog-backend/repository"

	"github.com/mashingan/smapping"
)

type TopicService interface {
	Insert(topic dto.TopicCreateDTO) entity.Topic
	Update(topic dto.TopicUpdateDTO) entity.Topic
	Delete(topic entity.Topic)
	All() []entity.Topic
	FindByID(topicID uint64) entity.Topic
}

type topicService struct {
	topicRepository repository.TopicRepository
}

func NewTopicService(topicRepo repository.TopicRepository) TopicService {
	return &topicService{
		topicRepository: topicRepo,
	}
}

func (service *topicService) Insert(topic dto.TopicCreateDTO) entity.Topic {
	topicToInsert := entity.Topic{}
	err := smapping.FillStruct(&topicToInsert, smapping.MapFields(&topic))
	if err != nil {
		log.Fatalf("Failed to map %v", err)
	}
	insertedTopic := service.topicRepository.InsertTopic(topicToInsert)
	return insertedTopic
}

func (service *topicService) Update(topic dto.TopicUpdateDTO) entity.Topic {
	topicToUpdate := entity.Topic{}
	err := smapping.FillStruct(&topicToUpdate, smapping.MapFields(&topic))
	if err != nil {
		log.Fatalf("Failed to map %v", err)
	}
	updatedTopic := service.topicRepository.UpdateTopic(topicToUpdate)
	return updatedTopic
}

func (service *topicService) Delete(topic entity.Topic) {
	service.topicRepository.DeleteTopic(topic)
}

func (service *topicService) All() []entity.Topic {
	return service.topicRepository.AllTopic()
}

func (service *topicService) FindByID(topicID uint64) entity.Topic {
	return service.topicRepository.FindTopicByID(topicID)
}
