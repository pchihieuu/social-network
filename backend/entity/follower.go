// package entity

// type Follower struct {
// 	ID         uint64 `gorm:"primary_key:auto_increment" json:"id"`
// 	UserID     uint64 `gorm:"not null;uniqueIndex:idx_userid_followerid" json:"user_id"`
// 	FollowerID uint64 `gorm:"not null;uniqueIndex:idx_userid_followerid" json:"follower_id"`
// 	User       User   `gorm:"foreignkey:FollowerID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"user"`
// }

package entity

type Follower struct {
	ID         uint64 `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID     uint64 `gorm:"not null;uniqueIndex:idx_userid_followerid" json:"user_id"`
	FollowerID uint64 `gorm:"not null;uniqueIndex:idx_userid_followerid" json:"follower_id"`
	User       User   `gorm:"foreignKey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"user"`
	Follower   User   `gorm:"foreignKey:FollowerID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"follower"`
}
