package entity

type Subscribe struct {
	ID      uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID  uint64 `gorm:"not null;uniqueIndex:idx_userid_topicid" json:"user_id" form:"user_id"`
	TopicID uint64 `gorm:"not null;uniqueIndex:idx_userid_topicid" json:"topic_id" form:"topic_id" binding:"required"`
	User    User   `gorm:"foreignKey:UserID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"user"`
	Topic   Topic  `gorm:"foreignKey:TopicID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"topic"`
}
