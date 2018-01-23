import { Component } from '@angular/core';
import { ArticlesService } from './services/articles.service';
import { Observable } from 'rxjs/Observable';
import { Article } from './models/article';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alert$: Observable<Alert>;

  articles$: Observable<Article[]>;

  constructor(private articlesService: ArticlesService) {}

  companies = [
    { id: 1, name: "Первая городская"},
    { id: 2, name: "ООО Новое"},
    { id: 3, name: "ИП Тестовый"},
    { id: 4, name: "АО Продакшн"},
    { id: 5, name: "Вечный девелопмент"},
    { id: 6, name: "Правда"}
  ];

  ngOnInit() {
    this.articlesService.getAll().delay(500).subscribe(
      data => {
        console.log("Data:", data);
        if (data.result === "success") {
          console.log("Success");
          let message = "Всего найдено " + data.total + " документов";
          this.setAlert("success", message);

          this.articles$ = of(data.data.slice(0, 5));
        } else {
          console.log("Error");
          let message = "Ошибка сервера при получении документов: " + data.error;
          this.setAlert("danger", message);
        }
      },
      error => {
        console.log("Error:", error);
        let message = "Ошибка: " + error.error;
        this.setAlert("danger", message);
      },
      () => { console.log("Completed!"); }
    )
  }

  setAlert(type: string, message: string) {
    let alert = new Alert();
    alert.type = type;
    alert.message = message;

    this.alert$ = of(alert);
    console.log(this.alert$);
  }
}

class Alert{
  type: string;
  message: string;
}
