import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';
import { QuestionPostingService } from 'src/app/services/question-posting.service';
import { QuestionAnswer } from '../../interfaces/ChatterbotInterfaces';

@Component({
  selector: 'app-chatterbot',
  templateUrl: './chatterbot.component.html',
  styleUrls: ['./chatterbot.component.css'],
})
export class ChatterbotComponent implements OnInit {
  questionsAnswers: QuestionAnswer[] = [];
  questions = new FormGroup({
    question: new FormControl(''),
  });

  constructor(private questionPostingService: QuestionPostingService) {}

  async ask() {
    let userQuestion = this.questions.value.question;

    if (userQuestion != null && userQuestion != undefined) {
      let newQuestion = { class: 'question', questionAnswer: userQuestion };
      this.questionsAnswers.push(newQuestion);
      document.forms[0].reset();

      await this.questionPostingService
        .askChatbot({
          question: userQuestion,
        })
        .then((chatbotResponse) => {
          chatbotResponse.subscribe((chatbotAnswer) => {
            let answer: string = chatbotAnswer.answer;

            let newAnswer: QuestionAnswer = {
              class: 'answer',
              questionAnswer: answer,
            };

            this.questionsAnswers.push(newAnswer);
          });
        });
    }
  }

  ngOnInit(): void {
    let introP = {
      class: 'answer',
      questionAnswer:
        'Hi, I am ChatterBot. Do you have any questions about life and the universe?',
    };
    this.questionsAnswers.push(introP);

    document.body
      .querySelector('.conversation')
      ?.addEventListener('DOMSubtreeModified', () => {
        let conversation = document.body.querySelector('.conversation');
        conversation?.scrollTo({
          top: conversation.scrollHeight,
          left: 0,
          behavior: 'smooth',
        });
      });
  }
}
