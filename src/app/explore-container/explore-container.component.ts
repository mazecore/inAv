import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HTTP } from '@ionic-native/http/ngx';
import { environment } from '../../environments/environment';
import { credentials } from './.test_file';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LikingResponse } from '../models/response';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {


  @Input() name: any;

  public user = {
                  login: '',
                  password: '',
                  numberOfLikes: 200,
                  tag: '',
                  shutDown: false
                };
  public loading = false;
  public complete = '';
  public iterator = 0;
  // public instaForm = new FormGroup({
  //   username: new FormControl('', Validators.required),
  //   password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   tag: new FormControl('', Validators.required),
  //   number: new FormControl(300, Validators.required),
  // });
  // constructor(private http: HTTP) {}
  constructor(private http: HttpClient) {}

  switch(num: any) {
    this.iterator = num;
    this.fillForm();
  }

  getHello() {
    if (this.validate()) {
      this.complete = '';
      this.loading = true;
      this.http.post(environment.apiUrl + '/like_tag/', this.user, {} ).subscribe((data: any ) => {
            this.loading = false;
            console.log('data===>', data);
            this.complete = data.message;
            // this.iterator ++;
            // if (this.iterator < 2) {
            //   this.runLoop();
            // }
          },
          error => {
            this.loading = false;
            this.complete = `There was an error. ${error.status}: ${error.statusText}. ${environment.apiUrl}`;
            console.log(error);
          });
    }

    // if (this.validate()) {
    //   this.complete = null;
    //   this.loading = true;
    //   this.http.sendRequest(environment.apiUrl + '/update/',  {
    //     method: 'post',
    //     data: this.user,
    //     headers: { },
    //     timeout: 15000
    //   }).then(data => {
    //         this.loading = false;
    //         console.log('data===>', data);
    //         this.complete = 'Liking is complete!';
    //       }).catch(
    //       error => {
    //         this.loading = false;
    //         this.complete = `There was an error. ${error.status}: ${error.statusText}. ${environment.apiUrl}`;
    //         console.log(error);
    //       });
    // }
  }
  // getProfile() {
  //   this.fillForm();
  //   this.http.post('http://localhost:3000/profile/', {user_id: 50222} ).subscribe((data ) => {
  //     console.log('data===>', data);
  //   },
  //   error => {
  //     this.complete = `There was an error. ${error.status}: ${error.statusText}. ${environment.apiUrl}`;
  //     console.log(error);
  //   });
  // }

  getFollowers() {
    this.fillForm();
    this.http.post(environment.apiUrl + '/collect/', this.user, {} ).subscribe((data: any ) => {
      this.loading = false;
      console.log('data===>', data);
      this.complete = data.message;
    },
    error => {
      this.loading = false;
      this.complete = `There was an error. ${error.status}: ${error.statusText}. ${environment.apiUrl}`;
      console.log(error);
    });
  }

  getFollowersPhotos(shutdown: boolean) {
    this.user.shutDown = shutdown;
    this.http.post(environment.apiUrl + '/collect_photos/', this.user, {} ).subscribe((data: any ) => {
      this.loading = false;
      console.log('data===>', data);
      this.complete = data.message;
    },
    error => {
      this.loading = false;
      this.complete = `There was an error. ${error.status}: ${error.statusText}. ${environment.apiUrl}`;
      console.log(error);
    });
  }

  stopCollecting() {
    this.http.get(environment.apiUrl + '/collect_photos/stop').subscribe((data: any) => {
      this.loading = false;
      console.log('data===>', data);
      this.complete = data.message;
    },
    error => {
      this.loading = false;
      this.complete = `There was an error. ${error.status}: ${error.statusText}. ${environment.apiUrl}`;
      console.log(error);
    });
  }

  likeFollowers() {
    this.fillForm();
    this.http.post(environment.apiUrl + '/like_anothers_followers/', this.user, {} ).subscribe((data: any ) => {
      this.loading = false;
      console.log('data===>', data);
      this.complete = data.message;
      // this.switch(1);
      // this.runLoop();
    },
    error => {
      this.loading = false;
      this.complete = `There was an error. ${error.status}: ${error.statusText}. ${environment.apiUrl}`;
      console.log(error);
    });
  }

  ngOnInit() {
    // this.getProfile();
  }

  runLoop() {
    this.fillForm();
    this.user.tag = credentials[this.iterator].tags[6];
    this.getHello();
  }

  fillForm() {
    if (this.iterator < credentials.length) {
      this.user.login = credentials[this.iterator].login;
      this.user.password = credentials[this.iterator].password;
    }
  }

  validate() {
    for (const [key, value] of Object.entries(this.user)) {
        console.log(key, value);
        if (value.toString().length < 1) {
           this.complete = `Please complete the ${key} field`;
           return false;
        }
    }
    return true;
  }

}
