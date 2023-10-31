import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from './sidebar.component';
import { StorageService } from 'src/app/services/storage.service';

@NgModule({
    imports:[CommonModule, FormsModule, IonicModule],
    declarations:[SidebarComponent],
    exports:[SidebarComponent]
})

export class SidebarComponentModule implements OnInit{
    userType:string = ""
    constructor(
        private storage:StorageService
    ){

    }

    async ngOnInit() {
        this.userType = await this.storage.get("user_type")
    }

}