import { Component, Input, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { AlbumDetails } from '../interfaces/albumDetalles';
import { Song } from '../interfaces/cancionDetalles';
import { SelectedSongService } from '../services/selected-song.service';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  stop: true;
  selectedSong: Song;

  constructor(private albumService: AlbumService, 
              private selectedSongService: SelectedSongService) { }

  ngOnInit(): void {
    this.selectedSongService.currentSelectedSong.subscribe(s => this.selectedSong = s);
  }

  getAlbumDetails(id:number):AlbumDetails{
    let details = this.albumService.getAlbumDetails(id);
    return details;
  }

  getSongCompleteLocalPath(id:number): string {
    const albumDetails = this.albumService.getAlbumDetails(id);
    if(albumDetails){
      const songLocalPath = this.selectedSong.localPath;
      const prefix = "assets/music/"
      const finalPath =  prefix + albumDetails.localPath + "/" + songLocalPath;
      console.log("pasando al reproductor el archivo: " +  finalPath);
      return finalPath;
    } else {
      return null;
    }
    
  }

}
