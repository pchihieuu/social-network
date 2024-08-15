// package entity

// type Comment struct {
// 	ID      uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
// 	Content string `gorm:"type:text" json:"content"`
// 	PostID  uint64 `gorm:"not null" json:"post_id"`
// 	UserID  uint64 `gorm:"not null" json:"user_id"`
// 	User    User   `gorm:"foreignKey:UserID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"user"`
// 	Post    Post   `gorm:"foreignKey:PostID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"post"`
// }

package entity

type Comment struct {
	ID      uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	Content string `gorm:"type:text" json:"content"`
	PostID  uint64 `gorm:"not null" json:"post_id"`
	UserID  uint64 `gorm:"not null" json:"user_id"`
	User    User   `gorm:"foreignKey:UserID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"user"`
	Post    Post   `gorm:"foreignKey:PostID;constraint:onUpdate:CASCADE,onDelete:SET NULL" json:"post"`
}
