import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameService, dataSubscribe} from "../../services/game/game.service";
import { Observable, Subscription } from 'rxjs';

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
export class InvitedUserComponent implements OnInit, OnDestroy{
  constructor(private router:Router,private gameService: GameService,private dataSubs: dataSubscribe) {
  }
  players: PlayerData[] = []
  dsub: Observable<any> | undefined;
  Subs: Subscription | undefined;
  roomId: string | undefined = this.gameService.roomId

  ngOnInit(): void {
    history.replaceState(null,"",`${document.location.origin}/`);
    if (!this.gameService.roomId) {
      this.router.navigateByUrl('/home').then()
    }

    this.dsub = this.dataSubs.subscribe();

    this.Subs = this.dsub?.subscribe(data => {
        const json = JSON.parse(data)
        if (json.connection_id !== undefined){
        console.log(json.username)
        this.players = json.players
      } else{
        this.router.navigateByUrl('/countdown').then()
      }
    })
  }
  copyUrl(){
    navigator.clipboard.writeText(`${document.location.origin}/invited-home?roomId=${this.roomId}`).then();
    alert("Copied the URL");
  }

  ngOnDestroy(): void {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }
  selectedOption: string = ''; // デフォルト値を設定

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
