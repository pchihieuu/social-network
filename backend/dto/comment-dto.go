package dto

// CommentUpdateDTO is used by client when PUT update comment
type CommentUpdateDTO struct {
	ID      uint64 `json:"id,omitempty" form:"id,omitempty"`
	Content string `json:"content" form:"content" binding:"required"`
	PostID  uint64 `json:"post_id,omitempty" form:"post_id,omitempty"`
	UserID  uint64 `json:"user_id,omitempty" form:"user_id,omitempty"`
}

// CommentCreateDTO is used by client when POST create new comment
type CommentCreateDTO struct {
	Content string `json:"content" form:"content" binding:"required"`
	UserID  uint64 `json:"user_id,omitempty"  form:"user_id,omitempty"`
	PostID  uint64 `json:"post_id,omitempty" form:"post_id,omitempty"` // Sửa lại thành post_id
}

// CommentDeleteDTO is used by client when DELETE comment
type CommentDeleteDTO struct {
	ID uint64 `json:"id" form:"id" binding:"required"`
}
