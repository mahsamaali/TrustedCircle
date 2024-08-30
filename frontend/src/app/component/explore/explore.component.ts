import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  isAucunResult: Boolean = false;

  $userProTab:any = [];
  submitted = false;
  searchExploreForm: FormGroup;
  constructor(public fb: FormBuilder,
    private router: Router,
    private userService: UserService) {
      this.searchForm()
      
  }

  
  tabUserProRegions: any = [
    'Bas-Saint-Laurent',
    'Saguenay–Lac-Saint-Jean',
    'Capitale-Nationale',
    'Mauricie',
    'Estrie',
    'Montréal',
    'Outaouais',
    'Abitibi-Témiscamingue',
    'Côte-Nord',
    'Nord-du-Québec',
    'Gaspésie–Îles-de-la-Madeleine',
    'Chaudière-Appalaches',
    'Laval',
    'Lanaudière',
    'Laurentides',
    'Montérégie',
    'Centre-du-Québec'
  ]

 tabUserProCategories: any = [
    'Assurance',
    'Immobilier',
    'Fiscalité',
    'Droit',
    'Investissement'    
  ]

  ngOnInit(): void {
  }

  readAllUser(){
    this.userService.getAllUser().subscribe((data) => {
      console.log('data',data)
      this.$userProTab = data['data'];
      console.log('this.$userProTab: ',this.$userProTab)
    })    
  }
  get myForm(){
    return this.searchExploreForm.controls;
  }


  searchForm() {
    this.searchExploreForm= this.fb.group({
      categorie: ['', [Validators.required]],
      region: ['', [Validators.required]],

     })
  }

  onSubmit() {

    let categorie = this.searchExploreForm.value['categorie'];
    let region = this.searchExploreForm.value['region'];

    console.log("Catégorie : ", categorie, "; Région :", region);


    this.submitted = true;
    if (!this.searchExploreForm.valid) {
      return false;
    } else {
      console.log('this.userForm.value',this.searchExploreForm.value)
      
      this.userService.getUserPro_droit_region(categorie, region).subscribe(
        (res) => {
          console.log('Résultat de getUserpro_droit_region : ', res)
          
          this.$userProTab = res['data'];
          if (this.$userProTab.length == 0)
          {
            this.isAucunResult = true;
          }
          else {
            console.log("il y a des resultats")
            this.isAucunResult = false;
          }
          console.log('this.$userProTab: ',this.$userProTab)
          // this.$userProTab = res;
          // console.log('this.$userProTab: ',this.$userProTab
          //this.ngZone.run(() => this.router.navigateByUrl('/home'))
        }, (error) => {
          console.log(error);
        });

    }

    console.log('form value: ',this.searchExploreForm.value)
  }

}
