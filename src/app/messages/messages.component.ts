import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Observable } from 'rxjs';
import { AppState } from '../app.config';
import { Store } from '@ngrx/store';
import { getMessages, isEmpty } from '../state/message/message.selectors';
import { messagesActions } from '../state/message/message.actions';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

  messages$: Observable<string[]>;
  isEmpty$: Observable<boolean>;

  constructor(public store: Store<AppState>) {
    this.messages$ = store.select(getMessages);
    this.isEmpty$ = store.select(isEmpty);
  }

  clear() {
    this.store.dispatch(messagesActions.clearMessages());
  }
}
