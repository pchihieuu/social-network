package dto

type SubscribeDTO struct {
	UserID  uint64 `json:"user_id,omitempty" form:"user_id,omitempty"`
	TopicID uint64 `json:"topic_id" form:"topic_id" binding:"required"`
}
