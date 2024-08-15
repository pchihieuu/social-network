package repository

import (
	"log"

	"blog-backend/entity"

	"gorm.io/gorm"
)

type SubscribeRepository interface {
	Subscribe(subscribe entity.Subscribe) entity.Subscribe
	Unsubscribe(subscribe entity.Subscribe)
	AllSubscribes(topicID uint64) []entity.Subscribe
	CountSubscribes(topicID uint64) int
	AllSubscribesByUser(userID uint64) []entity.Subscribe
	IsSubscribed(topicID uint64, userID uint64) bool
}

type subscribeConnection struct {
	connection *gorm.DB
}

func NewSubscribeRepository(databaseConnection *gorm.DB) SubscribeRepository {
	return &subscribeConnection{
		connection: databaseConnection,
	}
}

func (db *subscribeConnection) Subscribe(subscribe entity.Subscribe) entity.Subscribe {
	err := db.connection.Save(&subscribe)
	if err != nil {
		log.Println(err)
	}
	db.connection.Preload("User").Find(&subscribe)
	return subscribe
}

func (db *subscribeConnection) Unsubscribe(subscribe entity.Subscribe) {
	err := db.connection.Where("topic_id = ? AND user_id = ?", subscribe.TopicID, subscribe.UserID).Delete(&subscribe)
	if err != nil {
		log.Println(err)
	}
	db.connection.Preload("User").Find(&subscribe)
	log.Println("Unsubscribe", subscribe)
}

func (db *subscribeConnection) AllSubscribes(topicID uint64) []entity.Subscribe {
	var subscribes []entity.Subscribe
	db.connection.Preload("User").Find(&subscribes, "topic_id = ?", topicID)
	return subscribes
}

func (db *subscribeConnection) CountSubscribes(topicID uint64) int {
	var subscribes []entity.Subscribe
	db.connection.Preload("Subscribe").Find(&subscribes, "topic_id = ?", topicID)
	return len(subscribes)
}

func (db *subscribeConnection) AllSubscribesByUser(userID uint64) []entity.Subscribe {
	var subscribes []entity.Subscribe
	db.connection.Preload("Topic").Find(&subscribes, "user_id = ?", userID)
	return subscribes
}

func (db *subscribeConnection) IsSubscribed(topicID uint64, userID uint64) bool {
	var subscribe entity.Subscribe
	db.connection.Preload("User").Find(&subscribe, "topic_id = ? AND user_id = ?", topicID, userID)
	return subscribe.ID != 0
}
