package dto

type LikeDTO struct {
	UserID uint64 `json:"user_id,omitempty" form:"user_id" binding:"omitempty"`
	PostID uint64 `json:"post_id" form:"post_id" binding:"required"`
}
