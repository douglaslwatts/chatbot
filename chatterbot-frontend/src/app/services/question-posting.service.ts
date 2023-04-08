import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, Answer } from '../interfaces/ChatterbotInterfaces';

@Injectable({
  providedIn: 'root',
})
export class QuestionPostingService {
  apiUrl: string = 'http://localhost:5555/api/chatbot';
  headers = { 'content-type': 'application/json' };

  constructor(private httpClient: HttpClient) {}

  async askChatbot(question: Question): Promise<Observable<Answer>> {
    console.log(question);
    return this.httpClient.post<Answer>(this.apiUrl, question, {
      headers: this.headers,
    });
  }
}
