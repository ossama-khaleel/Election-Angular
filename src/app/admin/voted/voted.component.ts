import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';
import {
  ExportAsService,
  ExportAsConfig,
  SupportedExtensions,
} from 'ngx-export-as';
@Component({
  selector: 'app-voted',
  templateUrl: './voted.component.html',
  styleUrls: ['./voted.component.css']
})
export class VotedComponent implements OnInit {
  test :string =''
  downloadAs: SupportedExtensions = 'pdf';

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'sampleTable', // the id of html/table element
  };


  constructor(public home: HomeService,private exportAsService: ExportAsService) { }

  ngOnInit(): void {
    this.home.getAllUser();
    this.home.getGetAllVoted();
  }
  export() {
    this.exportAsConfig.type = this.downloadAs;
    // download the file using old school javascript method
    this.exportAsService
      .save(this.exportAsConfig, 'Exported_File_Name')
      .subscribe(() => {
        // save started
      });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    // this.exportAsService.get(this.exportAsConfig).subscribe((content) => {
    //   console.log(content);
    // });
  }
}
