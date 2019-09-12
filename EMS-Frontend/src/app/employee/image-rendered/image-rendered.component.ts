import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-image-rendered',
  templateUrl: './image-rendered.component.html',
  styleUrls: ['./image-rendered.component.css']
})
export class ImageRenderedComponent implements INoRowsOverlayAngularComp {

  private imageSource: string;

  agInit(params): void {
    this.imageSource = params.data.bloodGroup;
  }
}