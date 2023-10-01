import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { StorageService } from 'src/app/services/storage.service';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  isLoading: boolean = false;
  pageTitle: string = 'profile';
  serverAPI: string = environment.serverAPI;
  email: string = '';
  user_type: string = '';
  photoUrl: any;

  isEditPhone: boolean = false;

  userInfo!: any;
  fname: string = '';
  mname: string = '';
  lname: string = '';
  phone: string = '';

  birthdate = '';

  constructor(
    private storage: StorageService,
    private http: HttpClient,
    private platform: Platform,
    private session: SessionService,
    private navController:NavController,
    private util:UtilService,
  ) {}

  async ngOnInit() {
    await this.session.checkSession();
    this.email = await this.storage.get('email');
    this.user_type = await this.storage.get('user_type');

    this.fname = await this.storage.get('fname');
    this.mname = await this.storage.get('mname');
    this.lname = await this.storage.get('lname');
    await this.getUserInfo();
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    const imageBase64 = image.base64String;
    var imageUrl = image.webPath;
    this.photoUrl = imageUrl;
    let blob = await fetch(`${image.webPath}`).then((r) => r.blob());
    this.isLoading = true;

    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('image', blob);

    const response = this.http
      .post(`${this.serverAPI}/api/${this.user_type}/updateimage`, formData)
      .toPromise();
    const loadingPromise = new Promise((resolve) =>
      setTimeout(resolve, environment.loadingtime)
    );

    return await Promise.all([response, loadingPromise])
      .then(([response]) => {
        this.isLoading = false;
        console.log(response);
      })
      .catch((error) => {
        this.isLoading = false;
        console.log(error);
      });
  }

  // async readAsBase64(photo: Photo) {
  //   if (this.platform.is('hybrid')) {
  //     const file = await Filesystem.readFile({
  //       path: photo.path
  //     });
  //     return file.data;
  //   }
  //   else {
  //     const response = await fetch(photo.webPath);
  //     const blob = await response.blob();

  //     return await this.convertBlobToBase64(blob) as string;
  //   }
  // }

  async getUserInfo() {
    const id = await this.storage.get('id');
    const accessToken = await this.storage.get('accessToken');

    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    this.http
      .get(`${this.serverAPI}/api/${this.user_type}/${id}`, options)
      .subscribe(
        (res: any) => {
          this.userInfo = res.data;
          console.log(this.userInfo);
          if (this.user_type == 'pitiquer') {
            this.phone = this.userInfo.ptqr_phone;
          } else {
            this.phone = this.userInfo.rltr_phone;
            this.birthdate = this.userInfo.rltr_birthdate.split('T', 2)[0];
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  async editPhone() {
    this.isEditPhone = !this.isEditPhone;
    if (this.isEditPhone == false) {
      this.isLoading = true;
      const data = this.userInfo;
      const accessToken = await this.storage.get('accessToken');

      const options = {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };

      var formData;
      if (this.user_type == 'pitiquer') {
        formData = {
          id: data.ptqr_id,
          email: data.ptqr_email,
          firstname: data.ptqr_fname,
          middlename: data.ptqr_mname,
          lastname: data.ptqr_lname,
          phone: this.phone,
          city: data.ptqr_city,
          province: data.ptqr_province,
          bio: data.ptqr_bio,
          isphotog: data.ptqr_isphotog,
          isphotogedt: data.ptqr_isphotogedt,
          isvideog: data.ptqr_isvideog,
          isvideogedt: data.ptqr_isvideogedt,
          isamnty: data.ptqr_isamnty,
          isamntyedt: data.ptqr_isamntyedt,
          status: data.ptqr_status,
        };
      } else {
        // id,fname,mname,lname,email,phone,status
        formData = {
          id: data.rltr_id,
          fname: data.rltr_fname,
          mname: data.rltr_mname,
          lname: data.rltr_lname,
          email: data.rltr_email,
          phone: this.phone,
          birthdate: this.birthdate,
          status: 'active',
        };
      }

      const response = this.http
        .patch(`${this.serverAPI}/api/${this.user_type}/`, formData, options)
        .toPromise();
      const loadingPromise = new Promise((resolve) =>
        setTimeout(resolve, environment.loadingtime)
      );

      return await Promise.all([response, loadingPromise])
        .then(([response]) => {
          this.isLoading = false;
          console.log(response);
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    }
  }

  navigatePortfolio(){
    this.navController.navigateForward(["pitiquer-view-portfolio"])
  }
  navigatePackages(){
    this.navController.navigateForward(["pitiquer-view-packages"])
  }

  async deleteAccount(){
    this.isLoading = true;
    const data = this.userInfo;
    const accessToken = await this.storage.get('accessToken');

    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    var formData;
    if (this.user_type == 'pitiquer') {
      formData = {
        id: data.ptqr_id,
        email: data.ptqr_email,
        firstname: data.ptqr_fname,
        middlename: data.ptqr_mname,
        lastname: data.ptqr_lname,
        phone: this.phone,
        city: data.ptqr_city,
        province: data.ptqr_province,
        bio: data.ptqr_bio,
        isphotog: data.ptqr_isphotog,
        isphotogedt: data.ptqr_isphotogedt,
        isvideog: data.ptqr_isvideog,
        isvideogedt: data.ptqr_isvideogedt,
        isamnty: data.ptqr_isamnty,
        isamntyedt: data.ptqr_isamntyedt,
        status: "terminated",
      };
    } else {

      formData = {
        id: data.rltr_id,
        fname: data.rltr_fname,
        mname: data.rltr_mname,
        lname: data.rltr_lname,
        email: data.rltr_email,
        phone: this.phone,
        birthdate: this.birthdate,
        status: 'terminated',
      };
    }

    const response = this.http
      .patch(`${this.serverAPI}/api/${this.user_type}/`, formData, options)
      .toPromise();
    const loadingPromise = new Promise((resolve) =>
      setTimeout(resolve, environment.loadingtime)
    );

    return await Promise.all([response, loadingPromise])
      .then(([response]) => {
        this.isLoading = false;
        this.util.presentAlert("Account Deleted","","Your account has been deleted")
        this.session.logout()
        console.log(response);
      })
      .catch((error) => {
        this.isLoading = false;
        console.log(error);
      });
  }
  
}
