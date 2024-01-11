import { Component, EventEmitter, Output } from '@angular/core';
import { ValidFileTypePipe } from '../../pipes/ValidFileType/valid-file-type.pipe';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  isValidFileType = true;

  @Output() fileChanged = new EventEmitter<File | null>();

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.handleFile(event.target.files[0]);
    }
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event && event.previousContainer === event.container) {
      const file = event.item.data;
      if (file) {
        this.handleFile(file);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDropFile(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      const file = event.dataTransfer.files[0];
      if (file) {
        this.handleFile(file);
      }
    }
  }

  handleFile(file: File) {
    const validFileTypePipe = new ValidFileTypePipe();
    this.isValidFileType = validFileTypePipe.transform(file);

    if (this.isValidFileType) {
      this.selectedFile = file;
      this.imagePreview = URL.createObjectURL(file);
      this.fileChanged.emit(file);
    } else {
      this.removeFile();
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.fileChanged.emit(null);
  }
}
