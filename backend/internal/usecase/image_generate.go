package usecase

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/progate-hackathon-ari/backend/internal/entities/model"
)

type AnswerResponse struct {
	IsAllUserAnswered bool `json:"isAllUserAnswered"`
}

func (i *GameInteractor) ImageGenerate(ctx context.Context, roomID, prompt string) error {
	fmt.Println("rooms", Rooms)
	fmt.Println("rooms :id", Rooms[roomID])
	fmt.Println("rooms :id, player", Rooms[roomID].Players)
	fmt.Println("rooms :id, player :id", Rooms[roomID].Players[i.client.info.ConnectionID])
	// 2回目も防ぐ
	if Rooms[roomID].Players[i.client.info.ConnectionID].IsAnswered {
		return fmt.Errorf("already answered")
	}

	room, err := i.repo.GetRoom(ctx, roomID)
	if err != nil {
		return err
	}

	if err := i.repo.CreateIngamePrompt(ctx, &model.InGamePrompt{
		RoomID:       roomID,
		ConnectionID: i.client.info.ConnectionID,
		GameIndex:    room.CurrentGame,
		Prompt:       prompt,
	}); err != nil {
		return err
	}

	prompt, err = i.bedrock.BuildPrompt(ctx, strings.Join([]string{
		prompt,
		room.ExtraPrompt,
		// 暗黙的な内部の追加プロンプトはここに書く
	}, ","))
	if err != nil {
		return err
	}

	images, err := i.bedrock.GenerateImageFromText(ctx, prompt)
	if err != nil {
		return err
	}

	if err := i.s3.UplaodImage(ctx, fmt.Sprintf("%s/%s/%d.jpg", roomID, i.client.info.ConnectionID, room.CurrentGame), images[0]); err != nil {
		return err
	}

	Rooms[roomID].Players[i.client.info.ConnectionID].IsAnswered = true

	data, err := json.Marshal(&AnswerResponse{
		IsAllUserAnswered: IsAnswered(roomID),
	})
	if err != nil {
		return err
	}

	return BroadcastInRoom(roomID, data)
}