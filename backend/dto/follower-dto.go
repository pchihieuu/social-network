package dto

type FollowDTO struct {
	UserID     uint64 `json:"user_id" form:"user_id" binding:"omitempty"`
	FollowerID uint64 `json:"target_user_id" form:"target_user_id" binding:"required"`
}
