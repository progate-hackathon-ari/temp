import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../../services/game/game.service";

interface PlayerData {
  connection_id: string
  index: number
  room_id: string
  username: string
}


@Component({
  selector: 'app-invited-user',
  templateUrl: './invited-user.component.html',
  styleUrl: './invited-user.component.scss'
})
export class InvitedUserComponent implements OnInit{
  constructor(private router:Router,private gameService: GameService) {
  }
  players: PlayerData[] = []

  ngOnInit(): void {
    if (!this.gameService.connection) {
      this.router.navigateByUrl('/home').then()
    }

    this.gameService.connect().subscribe((data:string) => {
      const json = JSON.parse(data)
      this.players = json.players
      console.log(this.players)
    })
  }
  selectedOption: string = ''; // デフォルト値を設定

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
