import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  constructor() {



  }

  listner() {
    window.addEventListener(
      'storage',
      event => {
        console.log(event.key);
        const credentials = JSON.parse(sessionStorage.getItem('CREDENTIALS_TOKEN'));
        if (event.key === 'REQUESTING_SHARED_CREDENTIALS' && credentials) {
          console.log('localStorage set ');
          localStorage.setItem('CREDENTIALS_SHARING', JSON.stringify({ token: 'any-token-you-want' + Date.now().toString() }));
          localStorage.removeItem('CREDENTIALS_SHARING');
        }
        if (event.key === 'CREDENTIALS_SHARING' && !credentials) {
          console.log('sessionStorage set ');
          sessionStorage.setItem('CREDENTIALS_TOKEN', event.newValue);
        }
        if (event.key === 'CREDENTIALS_FLUSH' && credentials) {
          sessionStorage.removeItem('CREDENTIALS_TOKEN');
        }
      },
      false
    );




  }

  ngOnInit(): void {
    this.listner();
    localStorage.setItem('REQUESTING_SHARED_CREDENTIALS', Date.now().toString());
    localStorage.removeItem('REQUESTING_SHARED_CREDENTIALS');
  }
  logOut() {
    localStorage.setItem('CREDENTIALS_FLUSH', Date.now().toString());
    localStorage.removeItem('CREDENTIALS_FLUSH');
  }
  tokenGenerate() {
    sessionStorage.setItem('CREDENTIALS_TOKEN', JSON.stringify({ token: 'any-token-you-want' + Date.now().toString() }));
  }
}
