import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { AdminUserComponent } from './wait-room/admin-user/admin-user.component';
import { QuestionMenuComponent } from './question-menu/question-menu.component';
import { AnswerMenuComponent } from './answer-menu/answer-menu.component';
import { ResultMenuComponent } from './result-menu/result-menu.component';
import { InvitedUserComponent } from './wait-room/invited-user/invited-user.component';
import { HttpClientModule } from '@angular/common/http';
import {GameService} from "./services/game/game.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    AdminUserComponent,
    QuestionMenuComponent,
    AnswerMenuComponent,
    ResultMenuComponent,
    InvitedUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
