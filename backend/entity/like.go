// package entity

// type Like struct {
// 	ID     uint64 `gorm:"primary_key;auto_increment"`
// 	UserID uint64 `gorm:"not null;uniqueIndex:idx_userid_postid" json:"user_id" form:"user_id"`
// 	PostID uint64 `gorm:"not null;uniqueIndex:idx_userid_postid" json:"post_id" form:"post_id" binding:"required"`
// 	User   User   `gorm:"foreignkey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"user"`
// 	Post   Post   `gorm:"foreignkey:PostID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"post"`
// }

package entity

type Like struct {
	ID     uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID uint64 `gorm:"not null;uniqueIndex:idx_userid_postid" json:"user_id" form:"user_id"`
	PostID uint64 `gorm:"not null;uniqueIndex:idx_userid_postid" json:"post_id" form:"post_id" binding:"required"`
	User   User   `gorm:"foreignKey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"user"`
	Post   Post   `gorm:"foreignKey:PostID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"post"`
}
