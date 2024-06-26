import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../services/game/game.service";
import {Router} from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import { dataSubscribe } from '../services/game/game.service';
interface CountdownData {
  is_done: boolean
  count: number
}

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy{
  countNumber: number | undefined
  dsub: Observable<any> | undefined;
  Subs: Subscription | undefined;
  constructor(private router: Router, private gameService: GameService,private dataSubs: dataSubscribe ) {
  }

  ngOnInit(): void {
    history.replaceState(null,"",`${document.location.origin}`);
    if (!this.gameService.roomId) {
      this.router.navigateByUrl('/home').then()
    }

    this.dsub = this.dataSubs.subscribe();

    this.Subs = this.dsub?.subscribe(data => {
        const json = JSON.parse(data) as CountdownData
        console.log(json)
        this.countNumber = json.count
      if (json.is_done) {
        this.router.navigateByUrl('/question').then();
      }
    })
    this.gameService.removeSubscribe()
  }
  ngOnDestroy(): void {
    if (this.Subs) {
      this.Subs.unsubscribe();
    }
  }
}
