import { identifierModuleUrl } from '@angular/compiler/compiler';
import { Component, NgZone, ViewChild, ElementRef, ɵConsole } from '@angular/core';
import { ActionSheetController, AlertController, App, LoadingController, NavController, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Login } from '../login/login';
import { SignupPage } from '../signup/signup';
import { AddproductPage } from '../addproduct/addproduct';
import { AddnewlocationPage } from '../addnewlocation/addnewlocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpErrorResponse } from '@angular/common/http';
import { GraphPage } from '../graph/graph';
import { UpdatestockPage } from '../updatestock/updatestock';
import { FinancePage } from '../finance/finance';
import { RequestproductPage } from '../requestproduct/requestproduct';
import { RequestlistPage } from '../requestlist/requestlist';
import { SummaryPage } from '../summary/summary';
import { CheckstockPage } from '../checkstock/checkstock';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  @ViewChild('mapContainer') mapContainer: ElementRef;
  @ViewChild('pieChart') pieChart;
  @ViewChild('barChart') barChart;
  @ViewChild('lineChart') lineChart;

  loginInfo: {"username" : any};
  rootPage = Login;
  pages: Array<{title: string, component: any}>;

  addressElement: HTMLInputElement = null;
  infoWindows: any;
  listSearch: string = '';
  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";
  regionals: any = [];
  currentregional: any;
  responseData: any;
  location: any;
  locationList: any;
  //loginInfo: {"username" : ""};

  constructor(
    private authservice: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    public http: Http
  ) {
    this.infoWindows = [];
    this.platform.ready().then(() => this.loadMaps());
    this.regionals = [{
      "title": "Marker 1",
      "latitude": 52.50094,
      "longitude": 13.29922,
    }, {
      "title": "Marker 3",
      "latitude": 52.50010,
      "longitude": 13.29922,
    }, {
      "title": "Marker 2",
      "latitude": 49.1028606,
      "longitude": 9.8426116
    }];
  }
  
  ngOnInit() {
    this.authservice.getData('locationlist.php').subscribe(data => {
      this.responseData = data;
      this.location = this.responseData;
      this.locationList = this.location.records;
      console.log(this.locationList);
    }, (err : HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

    this.loginInfo = JSON.parse(localStorage.getItem('infologin'));
    console.log(this.loginInfo);
    console.log(this.loginInfo.username);
    if(this.loginInfo.username == 'admin')
    {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Add Product', component: AddproductPage },
        { title: 'Add Location', component: AddnewlocationPage },
        { title: 'Check Stock', component: CheckstockPage },
        { title: 'Finance', component: FinancePage },
        { title: 'Report', component: GraphPage },
        { title: 'Request List', component: RequestlistPage },
        { title: 'Summary', component: SummaryPage },
        { title: 'Signup', component: SignupPage }
      ];
    }
    else
    {
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Update stock', component: UpdatestockPage },
        { title: 'Check Stock', component: UpdatestockPage },
        { title: 'Finance', component: FinancePage },
        { title: 'Report', component: GraphPage },
        { title: 'Request', component: RequestproductPage },
        { title: 'Request List', component: RequestlistPage },
      ];
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  viewPlace(id) {
    console.log('Clicked Marker', id);
  }
  
  ionViewWillEnter() {
    this.getMarkers();
  }
  getMarkers() {
    var data = this.locationList ;
    this.addMarkersToMap(data);
  }
  
  addMarkersToMap(markers) {
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        locationid: marker.locationID,
        contact: marker.phone,
        opentime: marker.time,
        locationaddress: marker.address,
        detail: marker.description,
        icon: 'assets/imgs/marker.png'});
      dogwalkMarker.setMap(this.map);
      this.addInfoWindowToMarker(dogwalkMarker);
    }
  }
  addInfoWindowToMarker(marker) {
    var infoWindowContent = 
    '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1><label id="secondHeading" class="secondHeading">' + "ID : " + marker.locationid + '</label><br /> <label id="secondHeading" class="secondHeading">' + "Phone Number : " + marker.contact + '</label><br /><label id="secondHeading" class="secondHeading">' + "Open Time : " + marker.opentime + '</label><br /><label id="secondHeading" class="secondHeading">' + "Address : " + marker.locationaddress + '</label><br /><button type="buttton" onclick="document.getElementById(\'addProduct\').click();">Add Product</button></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }
  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

  initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 10
      };
      this.map.setOptions(options);
      this.addMarker(location, "Hai, it's you");

    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }

  initializeMap() {
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        zoom: 10,
        center: { lat: -6.21462, lng: 106.84513 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
      });

      let markers = [];
      for (let regional of this.regionals) {
        regional.distance = 0;
        regional.visible = false;
        regional.current = false;

        let markerData = {
          position: {
            lat: regional.latitude,
            lng: regional.longitude
          },
          map: this.map,
          title: regional.title,
        };

        regional.marker = new google.maps.Marker(markerData);
        markers.push(regional.marker);

        regional.marker.addListener('click', () => {
          for (let c of this.regionals) {
            c.current = false;
            //c.infoWindow.close();
          }
          this.currentregional = regional;
          regional.current = true;

          //regional.infoWindow.open(this.map, regional.marker);
          this.map.panTo(regional.marker.getPosition());
        });
      }

      new MarkerClusterer(this.map, markers, {
        styles: [
          {
            height: 53,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 53,
            textColor: '#fff'
          },
          {
            height: 56,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 56,
            textColor: '#fff'
          },
          {
            height: 66,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 66,
            textColor: '#fff'
          },
          {
            height: 78,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 78,
            textColor: '#fff'
          },
          {
            height: 90,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 90,
            textColor: '#fff'
          }
        ]
      });

      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        google.maps.event.trigger(this.map, 'resize');
        mapEle.classList.add('show-map');
        this.bounceMap(markers);
        this.getCurrentPositionfromStorage(markers)
      });

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });


    });
  }

  //Center zoom
  //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

  getCurrentPositionfromStorage(markers) {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let myPos = new google.maps.LatLng(result.lat, result.long);
        this.map.setOptions({
          center: myPos,
          zoom: 14
        });
        let marker = this.addMarker(myPos, "My last saved Location: " + result.location);

        markers.push(marker);
        this.bounceMap(markers);

        this.resizeMap();
      }
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  choosePosition() {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Last Location: ' + result.location,
          buttons: [
            {
              text: 'Reload',
              handler: () => {
                this.getCurrentPosition();
              }
            },
            {
              text: 'Delete',
              handler: () => {
                this.storage.set('lastLocation', null);
                this.showToast('Location deleted!');
                this.initializeMap();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        this.getCurrentPosition();

      }
    });
  }

  // go show currrent location
  getCurrentPosition() {
    this.loading = this.loadingCtrl.create({
      content: 'Searching Location ...'
    });
    this.loading.present();

    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Location found!');

          console.log(position.coords.latitude, position.coords.longitude);
          let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          this.addMarker(myPos, "Hai, it's you");

          let alert = this.alertCtrl.create({
            title: 'Location',
            message: 'Do you want to save the Location?',
            buttons: [
              {
                text: 'Cancel'
              },
              {
                text: 'Save',
                handler: data => {
                  let lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };
                  console.log(lastLocation);
                  this.storage.set('lastLocation', lastLocation).then(() => {
                    this.showToast('Location saved');
                  });
                }
              }
            ]
          });
          alert.present();

        });
      },
      (error) => {
        this.loading.dismiss().then(() => {
          this.showToast('Location not found. Please enable your GPS!');

          console.log(error);
        });
      }
    )
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  addMarker(position, content) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });

    this.addInfoWindow(marker, content);
    return marker;
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  logout(){
    // Remove API token 
    localStorage.removeItem('logininfo')
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  login(){
    this.nav.push(Login);
    }

  signup(){
    this.nav.push(SignupPage);
    }

  addproduct(){
    this.nav.push(AddproductPage);
    }

  addlocation(){
    this.nav.push(AddnewlocationPage);
    }
    
  graph(){
    this.nav.push(GraphPage);
    }

  updatestock(){
    this.nav.push(UpdatestockPage);
    }

  finance(){
    this.nav.push(FinancePage);
    }

  requestproduct(){
    this.nav.push(RequestproductPage);
    }

  requestlist(){
    this.nav.push(RequestlistPage);
    }
    
  summary(){
    this.nav.push(SummaryPage);
    }

  checkstock(){
    this.nav.push(CheckstockPage);
    }
}