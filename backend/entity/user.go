// package entity

// // User struct represents a user in the config.
//
//	type User struct {
//		ID        uint64      `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
//		Name      string      `gorm:"type:varchar(255)" json:"name" form:"name"`
//		Email     string      `gorm:"uniqueIndex;type:varchar(255)" json:"email" form:"email"`
//		Password  string      `gorm:"->;<-;not null" json:"-" form:"password"`
//		Token     string      `gorm:"-" json:"token,omitempty"`
//		Posts     *[]Post     `json:"posts,omitempty"`
//		Comments  *[]Comment  `json:"comments,omitempty"`
//		Likes     *[]Like     `json:"likes,omitempty"`
//		Followers *[]Follower `json:"followers,omitempty"`
//		Following *[]Follower `json:"following,omitempty"`
//	}
package entity

import (
	"time"

	"gorm.io/gorm"
)

// User struct represents a user in the system.
type User struct {
	ID        uint64      `gorm:"primaryKey;autoIncrement" json:"id" form:"id"`
	Name      string      `gorm:"type:varchar(255)" json:"name" form:"name"`
	Email     string      `gorm:"uniqueIndex;type:varchar(255)" json:"email" form:"email"`
	Password  string      `gorm:"->;<-;not null" json:"-" form:"password"`
	Token     string      `gorm:"-" json:"token,omitempty"`
	Posts     *[]Post     `json:"posts,omitempty"`
	Comments  *[]Comment  `json:"comments,omitempty"`
	Likes     *[]Like     `json:"likes,omitempty"`
	Followers *[]Follower `json:"followers,omitempty"`
	Following *[]Follower `json:"following,omitempty"`
	// Fields for Google OAuth
	// Timestamps
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`
}
