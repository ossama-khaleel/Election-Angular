import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Tesseract from 'tesseract.js';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  municipalStatus: any[] = [];
  allVotes: any[] = [];
  totalVotes: any[] = [];
  userVote: any = {};
  selectedcCat: any = {};
  selectedcCandidate: any = {};
  userinfo: any = {};
  municipalName: any[] = [];
  placeofresidence: any[] = [];
  placeofresidencevillage: any[] = [];
  governorate: any[] = [];
  user: any[] = [];
  userlengt: number = 0;
  userById: any = {};
  selectedAbout: any = {};
  candidate: any[] = [];
  AllCandidateVote: any[] = [];
  AllCandidates: any[] = [];
  electionduration: any[] = [];
  testimonial: any[] = [];
  Hometestimonial: any[] = [];
  homepage: any[] = [];
  contactus: any[] = [];
  places: any[] = [];
  aboutus: any[] = [];
  category: any[] = [];
  categoryName: string = '';
  categoryId: number = 0;
  display_image: any[] = [];
  municipalStatusById: any = {};
  about1: any = {};
  about2: any = {};
  about3: any = {};
  about4: any = {};
  aboutAll: any[] = [];
  candidatesById: any;
  ssn: number | undefined;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router) { }
  GetAboutAll() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/About').subscribe((resp: any) => {
      this.aboutAll = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  GetAbout1() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/About/getbyid1').subscribe((resp: any) => {
      this.about1 = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  GetAbout2() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/About/getbyid2').subscribe((resp: any) => {
      this.about2 = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  GetAbout3() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/About/getbyid3').subscribe((resp: any) => {
      this.about3 = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  GetAbout4() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/About/getbyid4').subscribe((resp: any) => {
      this.about4 = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }








  GetMuniByCategory(id: number) {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/MunicipalStatus/GetMuniByCatId/' + id).subscribe((resp: any) => {
      this.municipalStatus = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  GetCandidatesByCondition(id: number) {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.spinner.show();
      this.http.get('https://localhost:44383/api/category/getbyid/' + id).subscribe((resp: any) => {
        this.categoryName = resp.categoryname;
        this.categoryId = resp.id;
      });
      this.http.get(`https://localhost:44383/api/Candidate/GetCandidates/${+user.UserId}/${id}`).subscribe((resp: any) => {
        if (resp == null) {
          this.router.navigate(['/auth/login']);
          this.spinner.hide();
          this.toastr.success('Done');
        }
        else {
          this.AllCandidateVote = resp;
          this.router.navigate(['/candidate']);
          this.spinner.hide();
          this.toastr.success('Done');
        }

      }, err => {
        this.toastr.error(err.message, err.status);
      });
      this.http.get(`https://localhost:44383/api/Candidate/GetCandidateForUser/${+user.UserId}/${id}`).subscribe((resp: any) => {
        this.AllCandidates = resp;
        this.router.navigate(['/candidate']);
        this.spinner.hide();
        this.toastr.success('Done');
      }, err => {
        this.toastr.error(err.message, err.status);
      });
    }
  }
  getAllMunicipalStatus() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/MunicipalStatus').subscribe((resp: any) => {
      this.municipalStatus = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  ElectionDoneForCandidates() {
    this.spinner.show();
    this.http.get('https://localhost:44383/api/Candidate/ElectionDoneForCandidates').subscribe((resp: any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  ElectionDoneForUsers() {
    this.spinner.show();
    this.http.get('https://localhost:44383/api/Candidate/ElectionDoneForUsers').subscribe((resp: any) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getTotalVotes() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/UserVoted/TotalVotes').subscribe((resp: any) => {
      this.totalVotes = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getGetAllVoted() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/UserVoted').subscribe((resp: any) => {
      this.allVotes = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getUserVoteByid() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.spinner.show();

      this.http.get('https://localhost:44383/api/uservote/getbyuserid/' + user.UserId).subscribe((resp: any) => {
        this.userVote = resp;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    }
  }

  getMunicipalStatusByUserId() {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    this.spinner.show();
    this.http.get('https://localhost:44383/api/PlacesWithintheMunicipal/UserMunicipal/' + user.UserId).subscribe((resp: any) => {
      this.municipalStatusById = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllGovernorate() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/governorate').subscribe((resp: any) => {
      this.governorate = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllMunicipalName() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/MunicipalName').subscribe((resp: any) => {
      this.municipalStatusById = { resp };
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllMunicipalNames() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/MunicipalName').subscribe((resp: any) => {
      this.municipalName = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllPlaceOfResidence() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/PlaceOfResidence').subscribe((resp: any) => {
      this.placeofresidence = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllVillages() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/PlaceofResidenceVillage').subscribe((resp: any) => {
      this.placeofresidencevillage = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllCategory() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/Category').subscribe((resp: any) => {
      this.category = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllUser() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/user').subscribe((resp: any) => {
      this.user = resp;
      this.userlengt = resp.length;

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getUserInfo() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      const id = +user.UserId;
      this.spinner.show();
      this.http.get('https://localhost:44383/api/UserInformation/getuser/' + id).subscribe((resp: any) => {
        this.userinfo = resp;


        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    }
  }
  getUserById() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    let users: any = localStorage.getItem('user');
    users = JSON.parse(users);
    let userid: number = +users.UserId;
    this.spinner.show();
    this.http.get('https://localhost:44383/api/user/getbyid/' + userid).subscribe((resp: any) => {
      this.userById = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllCandidate() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/CandidateForm').subscribe((resp: any) => {
      this.candidate = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllCandidates() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/Candidate').subscribe((resp: any) => {
      this.AllCandidateVote = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllPlaces() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/PlacesWithintheMunicipal').subscribe((resp: any) => {
      this.places = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllElectionDuration() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/ElectionDuration').subscribe((resp: any) => {
      this.electionduration = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllTestimonial() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/Testimonial').subscribe((resp: any) => {
      this.testimonial = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllHomeTestimonial() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/Testimonial/homeTestimonials').subscribe((resp: any) => {
      this.Hometestimonial = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllHome() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();

    this.http.get('https://localhost:44383/api/Home').subscribe((resp: any) => {
      this.homepage = resp;
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllContactUs() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/contactu').subscribe((resp: any) => {
      this.contactus = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAllAboutUs() {
    //show spinner 
    //hits api
    //hide spinner
    //resp => toaster
    this.spinner.show();
    this.http.get('https://localhost:44383/api/Aboutu').subscribe((resp: any) => {
      this.aboutus = resp;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  uploadAttachment(file: FormData) {

    this.http.post('https://localhost:44383/api/user/UploadImage', file).subscribe((resp: any) => {
      this.display_image = resp.userimagepath;
      console.log(this.display_image);
    }, err => {
      this.toastr.error('Can not Upload Image');
      console.log(err);
    })
  }


  uploadAttachmentForSsn(file: FormData) {
    this.http.post('https://localhost:44383/api/user/UploadImage', file).subscribe((resp: any) => {
      this.display_image = resp.userimagepath;
      console.log(this.display_image);
      Tesseract.recognize(
        `../../../assets/img/${this.display_image}`,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        console.log(text.match(/\d+/g));
        for (let index = 0; index < text.length; index++) {

          console.log(text.match(/\d+/g)![index]);

          if (text.match(/\d+/g)![index].length == 10) {
            this.ssn = +text.match(/\d+/g)![index];
            console.log(this.ssn);
          }
          // else if (text.match(/\d+/g)![index].length == 11) {
          //   // console.log(+text.match(/\d+/g)![index].substring(1, 11));
          //   this.ssn = +text.match(/\d+/g)![index].substring(1, 11);
          //   console.log(this.ssn);
          // }
          else if (text.match(/\d+/g)![index].length > 11) {
            this.toastr.error("Check Image Plesae");
          }
        }
      });
    }, err => {
      this.toastr.error('Can not Upload Image');
      console.log(err);
    })
  }
  Logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
