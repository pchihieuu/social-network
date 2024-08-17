// package entity

//	type Subscribe struct {
//		ID      uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
//		UserID  uint64 `gorm:"not null;uniqueIndex:idx_userid_topicid" json:"user_id" form:"user_id"`
//		TopicID uint64 `gorm:"not null;uniqueIndex:idx_userid_topicid" json:"topic_id" form:"topic_id" binding:"required"`
//		User    User   `gorm:"foreignKey:UserID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"user"`
//		Topic   Topic  `gorm:"foreignKey:TopicID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"topic"`
//	}
package entity

import (
	"time"

	"gorm.io/gorm"
)

// Subscribe struct represents a subscription relationship between users and topics.
type Subscribe struct {
	ID      uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID  uint64 `gorm:"not null;uniqueIndex:idx_userid_topicid" json:"user_id" form:"user_id"`
	TopicID uint64 `gorm:"not null;uniqueIndex:idx_userid_topicid" json:"topic_id" form:"topic_id" binding:"required"`
	User    User   `gorm:"foreignKey:UserID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"user"`
	Topic   Topic  `gorm:"foreignKey:TopicID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"topic"`
	// Timestamps
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}
