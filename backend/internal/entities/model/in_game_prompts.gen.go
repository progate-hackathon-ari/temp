// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.
// Code generated by gorm.io/gen. DO NOT EDIT.

package model

const TableNameInGamePrompt = "in_game_prompts"

// InGamePrompt mapped from table <in_game_prompts>
type InGamePrompt struct {
	RoomID       string `gorm:"column:room_id;not null" json:"room_id"`
	ConnectionID string `gorm:"column:connection_id;not null" json:"connection_id"`
	GameIndex    int32  `gorm:"column:game_index;not null" json:"game_index"`
	Prompt       string `gorm:"column:prompt;not null" json:"prompt"`
}

// TableName InGamePrompt's table name
func (*InGamePrompt) TableName() string {
	return TableNameInGamePrompt
}
