package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/progate-hackathon-ari/backend/internal/usecase"
	"github.com/progate-hackathon-ari/backend/pkg/log"
)

type CreateRoomResponse struct {
	RoomID      string `json:"roomId"`
	ExtraPrompt string `json:"extraPrompt"`
}

func CreateRoom(i *usecase.RoomInteractor) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := c.Request().Context()

		room, err := i.CreateRoom(ctx)
		if err != nil {
			log.Error(ctx, "faled to create room", err)
			return echo.ErrInternalServerError
		}

		return c.JSON(http.StatusOK, CreateRoomResponse{
			RoomID:      room.RoomID,
			ExtraPrompt: room.ExtraPrompt,
		})
	}
}
