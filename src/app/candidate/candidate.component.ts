import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../Services/home.service';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  @ViewChild('callVoteDialog') callVoteDialog!: TemplateRef<any>;
  constructor(private router: Router, public home: HomeService, private http: HttpClient, private dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  voteForm: FormGroup = new FormGroup({
    candidatesId: new FormControl('', Validators.required),
    municipalstatusId: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required)
  })
  acndidateIds: number[] = [];
  decentralized: string = '';
  memebers: string = '';
  president: string = '';
  today = new Date();
  con: boolean = false;
  vote: boolean = false;
  // p_data: any = {
  //   id: this.home.userVote.id,
  //   userid: this.home.userVote.userid,
  //   usermunicipalid: this.home.userVote.usermunicipalid,
  //   president: this.home.userVote.president,
  //   memebers: this.home.userVote.memebers,
  //   decentralized: this.home.userVote.decentralized
  // };
  // this.home.userVote;
  ngOnInit(): void {
    this.home.getMunicipalStatusByUserId();
    this.home.getUserVoteByid();
    this.home.getTotalVotes();
    this.home.getAllElectionDuration();
    this.VoteDate();
    if (this.home.AllCandidateVote.length == 0) {
      this.router.navigate(['/category']);
    }
  }
  VoteDate() {
    debugger
    this.home.electionduration.forEach((element) => {
      debugger
      if (element.categoryid == this.home.categoryId) {
        debugger
        const now = new Date();
        if (element.electionenddate <= now.toISOString()) {
          this.vote = true;
        }
      }
    });
  }
  OpenVoteDialog() {

    debugger
    if (this.home.categoryName.toUpperCase() == 'memebers'.toUpperCase()) {
      if (this.home.userVote.memebers == 0) {
        this.toastr.error('you cant submit memebers form agian');
      }
      else {
        const dialogRef = this.dialog.open(this.callVoteDialog);
        dialogRef.afterClosed().subscribe((result) => {
          if (result == undefined || result == 'Cancel') {
            this.router.navigate(['/category']);
          }
        })

      }
    } else if (this.home.categoryName.toUpperCase() == 'decentralized'.toUpperCase()) {
      if (this.home.userVote.decentralized == 0) {
        this.toastr.error('you cant submit decentralized form agian');
      }
      else {
        const dialogRef = this.dialog.open(this.callVoteDialog);
        dialogRef.afterClosed().subscribe((result) => {
          if (result == undefined || result == 'Cancel') {
            this.router.navigate(['/category']);
          }
        })
      }
    } else if (this.home.categoryName.toUpperCase() == 'president'.toUpperCase()) {
      if (this.home.userVote.president == 0) {
        this.toastr.error('you cant submit president form agian');
      }
      else {
        const dialogRef = this.dialog.open(this.callVoteDialog);
        dialogRef.afterClosed().subscribe((result) => {
          if (result == undefined || result == 'Cancel') {
            this.router.navigate(['/category']);
          }
        })

      }
    }
  }
  saveData() {
    let user: any = localStorage.getItem('user');
    // this.home.municipalStatusById.president
    if (user) {
      user = JSON.parse(user);
      this.voteForm.controls['userId'].setValue(+user.UserId);
      for (let index = 0; index < this.acndidateIds.length; index++) {
        this.voteForm.controls['candidatesId'].setValue(+this.acndidateIds[index]);
        this.voteForm.controls['municipalstatusId'].setValue(this.home.municipalStatusById.id);
        this.CreateUserVoted(this.voteForm.value);
      }
      if (this.memebers != '') {
        this.home.userVote.memebers = 0;
      }
      else if (this.decentralized != '') {
        this.home.userVote.decentralized = 0;
      }
      else if (this.president != '') {
        this.home.userVote.president = 0;
      }
      this.UpdateUserVoted(this.home.userVote);
      this.router.navigate(['/category']);
    }
    else {
      this.toastr.error('Please Login First');
    }

  }
  CreateUserVoted(body: any) {
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44383/api/uservoted', body).subscribe((resp: any) => {
      console.log(resp);
      debugger
      this.spinner.hide();
      this.toastr.success('Your Request Sent successfully', '', { positionClass: 'toast-top-center' });
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  UpdateUserVoted(body: any) {
    this.spinner.show();
    debugger
    this.http.put('https://localhost:44383/api/uservote', body).subscribe((resp: any) => {
      this.spinner.hide();
      console.log(resp);
      debugger
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  Print(ev: any) {
    // PRESIDENT Check And Validation
    if (this.home.categoryName == 'PRESIDENT') {
      this.president = 'PRESIDENT';
      if (this.home.userVote.president != 0) {
        if (this.acndidateIds.indexOf(ev.target.value) != -1) {
          for (var i = 0; i < this.acndidateIds.length; i++) {
            if (this.acndidateIds[i] == ev.target.value) {
              var spliced = this.acndidateIds.splice(i, 1);
            }
          }
          this.con = this.home.userVote.president < this.acndidateIds.length;
        }
        else {
          this.acndidateIds.push(ev.target.value);
          if (this.home.userVote.president == this.acndidateIds.length) {
            this.toastr.warning('Cant Choose More');
          } else {
            this.toastr.warning('delete One To vote');
            this.con = this.home.userVote.president < this.acndidateIds.length;
          }
        }
      } else {
        this.toastr.warning("You have Aleardy Use All your Votes")
      }
      console.log(this.acndidateIds);
    }
    // MEMEBERS Check And Validation
    else if (this.home.categoryName == 'MEMEBERS') {
      this.memebers = 'MEMEBERS';
      if (this.home.userVote.memebers != 0) {
        if (this.acndidateIds.indexOf(ev.target.value) != -1) {
          for (var i = 0; i < this.acndidateIds.length; i++) {
            if (this.acndidateIds[i] == ev.target.value) {
              var spliced = this.acndidateIds.splice(i, 1);
            }
          }
          this.con = this.home.userVote.memebers < this.acndidateIds.length;
        }
        else {
          this.acndidateIds.push(ev.target.value);
          if (this.home.userVote.memebers == this.acndidateIds.length) {
            this.toastr.warning('Cant Choose More');
          } else if (this.home.userVote.memebers < this.acndidateIds.length) {
            this.toastr.warning('delete One To vote');
            this.con = this.home.userVote.memebers < this.acndidateIds.length;
          }
        }
      } else {
        this.router.navigate(['/category']);
        this.toastr.warning("You have Aleardy Use All your Votes")
      }
      console.log(this.acndidateIds);
    }
    // DECENTRALIZED Check And Validation
    else if (this.home.categoryName == 'DECENTRALIZED') {
      this.decentralized = 'DECENTRALIZED';
      if (this.home.userVote.decentralized != 0) {
        if (this.acndidateIds.indexOf(ev.target.value) != -1) {
          for (var i = 0; i < this.acndidateIds.length; i++) {
            if (this.acndidateIds[i] == ev.target.value) {
              var spliced = this.acndidateIds.splice(i, 1);
            }
          }
          this.con = this.home.userVote.decentralized < this.acndidateIds.length;
        }
        else {
          this.acndidateIds.push(ev.target.value);
          if (this.home.userVote.decentralized == this.acndidateIds.length) {
            this.toastr.warning('Cant Choose More');
          } else if (this.home.userVote.decentralized < this.acndidateIds.length) {
            this.toastr.warning('delete One To vote');
            this.con = this.home.userVote.decentralized < this.acndidateIds.length;
          }
        }
      }
      else {
        this.toastr.warning("You have Aleardy Use All your Votes");
      }
      console.log(this.acndidateIds);
    }
    else {
      this.router.navigate(['/category']);
    }
  }
}

