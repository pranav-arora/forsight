import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { SearchPage } from '../pages/search/search';
import { SearchBySpecPage } from '../pages/search/searchBySpec';
import { MapPage } from '../pages/map/map';
import { UserPage } from '../pages/user/user';
import {PhotoUploadPage} from '../pages/photoUpload/photoUpload';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { OptometristListPage } from '../pages/optometristList/optometristList';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import {FaceDetectionResultPage} from '../pages/face-detection-result/face-detection-result';
import {LensRecommenderPage} from '../pages/lens-recommender/lens-recommender';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public photos:any;
  public base64Image: string;
  rootPage: any = LoginPage;


  // rootPag: any = OptometristListPage;
  // rootPage: any = PhotoUploadPage;


  baseUrl: string;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public httpClient: HttpClient,
              private camera: Camera,
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private http: Http) {
    this.initializeApp();
    this.baseUrl = 'http://oapp.delhinerds.com/logout/';

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'md-home', },
      { title: 'News', component: NewsPage, icon: 'md-list-box', },
      { title: 'Name', component: SearchPage, icon: 'ios-search-outline', },
      { title: 'Specialisation', component: SearchBySpecPage, icon: 'ios-eye-outline', },
      { title: 'NearMe', component: MapPage, icon: 'ios-locate-outline', },
      { title: 'Profile', component: UserPage, icon: 'md-person', },
      { title: 'Logout', component: LoginPage, icon: 'md-log-out', },
      {title:'Specs Recommender', component: FaceDetectionResultPage, icon: 'glasses'},
      {title:'Lens Recommender', component: LensRecommenderPage, icon: 'eye'     }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }




  openPage(page) {
    if (page.component == LoginPage) {
      return this.http.get(this.baseUrl)
        .map(res => res.json())
        .subscribe(data => {
          // console.log("logout data=>", data);
          this.nav.setRoot(page.component);
        }, error => {
          console.log(error);
        });
    }
    else if (page.component == HomePage) {
      this.nav.setRoot(page.component);
    }
    else {
      this.nav.push(page.component);
    }
  }




}
