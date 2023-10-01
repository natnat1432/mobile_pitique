import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pitiquer-view-portfolio',
  templateUrl: './pitiquer-view-portfolio.page.html',
  styleUrls: ['./pitiquer-view-portfolio.page.scss'],
})
export class PitiquerViewPortfolioPage implements OnInit {
  isLoading: boolean = false;
  pageTitle: string = '';
  isSkeleton: boolean = true;
  portfolioImages: string[] = [];
  pitiquerEmail: string = '';
  serverAPI: string = environment.serverAPI;
  constructor(
    private navController: NavController,
    private storage: StorageService,
    private http: HttpClient,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.getPortfolioImages();
    this.pitiquerEmail = await this.storage.get('email');
  }

  navigateProfile() {
    this.navController.navigateBack(['user-profile']);
  }
  hideSkeleton() {
    // Get all of the image elements on the page.
    const images = Array.from(document.querySelectorAll('img'));

    // Check if all of the images have loaded.
    if (images.every((image) => image.complete)) {
      // Hide the skeleton text.
      this.isSkeleton = false;
    }
  }
  async getPortfolioImages() {
    const accessToken = await this.storage.get('accessToken');
    const email = await this.storage.get('email');
    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    const response = this.http
      .get(`${environment.serverAPI}/api/pitiquer/portfolio/${email}`, options)
      .toPromise();
    const loadingPromise = new Promise((resolve) => setTimeout(resolve, 3000));

    return await Promise.all([response, loadingPromise]).then(
      ([response]: any) => {
        this.isSkeleton = false;
        console.log(response);
        this.portfolioImages = response.data;
        console.log(this.portfolioImages);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async addPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    const imageBase64 = image.base64String;
    var imageUrl = image.webPath;
    let blob = await fetch(`${image.webPath}`).then((r) => r.blob());
    this.isLoading = true;

    const accessToken = await this.storage.get('accessToken');
    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    let formData = new FormData();
    formData.append('email', this.pitiquerEmail);
    formData.append('image', blob);

    const response = this.http
      .post(`${this.serverAPI}/api/pitiquer/portfolio`, formData, options)
      .toPromise();
    const loadingPromise = new Promise((resolve) =>
      setTimeout(resolve, environment.loadingtime)
    );

    return await Promise.all([response, loadingPromise])
      .then(async ([response]) => {
        this.isLoading = false;
        console.log(response);
        await this.getPortfolioImages();
      })
      .catch((error) => {
        this.isLoading = false;
        console.log(error);
      });
  }

  async alertDeleteImage(image: string) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this image?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert canceled');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.deleteImage(image)
          },
        },
      ],
    });


    await alert.present();
  }

  async deleteImage(portfolioImage: string) {
    await this.alertController.dismiss();
    const accessToken = await this.storage.get('accessToken');
    this.isLoading = true
    const options = {
      headers: {
        authorization: `Bearer ${accessToken}`,
        image:portfolioImage,
        email:this.pitiquerEmail,
      },
    };
    const response = this.http
      .delete(
        `${this.serverAPI}/api/pitiquer/deletePortfolioImage`,
        options
      )
      .toPromise();
    const loadingPromise = new Promise((resolve) =>
      setTimeout(resolve, environment.loadingtime)
    );

    return await Promise.all([response, loadingPromise]).then(
      async ([response]) => {
        console.log(response);
        this.isLoading = false
        await this.getPortfolioImages();
      },
      (error) => {
        this.isLoading = false
        console.log(error);
      }
    );
  }
}
