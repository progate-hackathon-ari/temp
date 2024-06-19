package gorm

import (
	"github.com/progate-hackathon-ari/backend/internal/repository"
	"gorm.io/gorm"
)

type GormRepo struct {
	db *gorm.DB

	*RoomRepository
}

func NewGormDB(db *gorm.DB) *GormRepo {
	return &GormRepo{
		db:             db,
		RoomRepository: NewRoomRepository(db),
	}
}

var _ repository.DataAccess = (*GormRepo)(nil)