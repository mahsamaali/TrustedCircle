import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  animTitle(words: any = []) {
    let visible = true;
    let con = document.getElementById('score');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let target = document.getElementById('text')
    window.setInterval(function() {
  
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount)
        window.setTimeout(function() {
          let usedWord = words.shift();
          words.push(usedWord);
          x = 1;
          letterCount += x;
          waiting = false;
        }, 100)
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        window.setTimeout(function() {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 2000)
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount)
        letterCount += x;
      }
    }, 100)
    window.setInterval(function() {
      if (visible === true) {
        con.className = 'vertical-score hidden'
        visible = false;
  
      } else {
        con.className = 'vertical-score'
  
        visible = true;
      }
    }, 400)
  }


  ngOnInit(): void {
    this.animTitle(["de la finance", "de l'immobilier", "de la fiscalité", "du notoriat"]);
  }

}
