// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

const TableNameUser = "users"

// User mapped from table <users>
type User struct {
	UserID   string `gorm:"column:user_id;primaryKey" json:"user_id"`
	Username string `gorm:"column:username;not null" json:"username"`
	Email    string `gorm:"column:email;not null" json:"email"`
}

// TableName User's table name
func (*User) TableName() string {
	return TableNameUser
}
