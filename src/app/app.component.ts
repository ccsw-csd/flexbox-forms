import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CodeModel } from '@ngstack/code-editor';
import { IParticlesProps } from 'ng-particles';
import { loadConfettiPreset } from 'tsparticles-preset-confetti';
import type { Engine } from "tsparticles-engine";
import { LEVELS } from './levels';
import { Level } from './Level';
import { HtmlUtilsService } from './html-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  localStorageKey : string = 'flexbox-form-storage';
  storageObject : any = {};

  particlesOptions : IParticlesProps = {
    fullScreen: false,    
    emitters: [{
        life: { duration: 0 },
        position: { x: 0, y: 20 },
        particles: { move: { direction: "top-right" }}
      },
      {
        life: { duration: 0 },
        position: { x: 100, y: 20 },
        particles: { move: { direction: "top-left" }}
    }],
    preset: "confetti",
  }

  isFinished: boolean = false;
  isLastLevel: boolean = false;

  sanitizedDescription: any = '';
  sanitizedBoardCode: any = '';
  sanitizedBoardCodeExample: any = '';
  sanitizedBoardStyle: any = '';
  
  
  levelNumber : number = 1;
  actualLevel : Level | undefined;

  theme = 'vs-dark';

  codeModelHtml: CodeModel = {
    language: 'html',
    uri: 'html.json',
    value: ``
  };

  codeModelCss: CodeModel = {
    language: 'css',
    uri: 'css.json',
    value: ``
  };  

  options = {
    lineNumbers: true,
    contextmenu: false,
    lineNumbersMinChars: 3,
    fontSize: 12,
    minimap: {
      enabled: false 
    }
  };

  constructor(private sanitizer: DomSanitizer, 
    private htmlUtils : HtmlUtilsService) {}


  ngOnInit(): void {
    this.readStorage();

    for (let i : number = 1; i <= 7; i++) {
      if (this.checkLevelStored(i)) {
        this.levelNumber = i;
      }
      else {
        break;
      }
    }

    this.levelNumber = 1;
    this.loadLevel(this.levelNumber);
    setTimeout(()=>this.change(), 100);
  }


  private saveStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.storageObject));
  }

  private readStorage() {
    let value = localStorage.getItem(this.localStorageKey);
    if (value)
      this.storageObject = JSON.parse(value);

    if (this.storageObject == null) this.storageObject = {};

  }

  public async particlesInit(engine: Engine): Promise<void> {    
    await loadConfettiPreset(engine);  
  };


  public onCodeChanged() : void {
    this.change();
  }

  private saveLevel(levelNumber: number, code: string, css: string) {

    let key = 'level-'+levelNumber+'-';
    this.storageObject[key+'css'] = css;
    this.storageObject[key+'code'] = code;

    this.saveStorage();

  }

  private checkLevelStored(levelNumber : number) : boolean {
    return this.storageObject['level-'+(levelNumber)+'-'+'code'];
  }

  public nextLevel(isFinished : boolean) : void {
    let filter = LEVELS.filter(item => item.id == this.levelNumber+1);
    if (!filter || filter.length != 1) return;
    if (isFinished == false && !this.checkLevelStored(this.levelNumber+1)) return;
    
    this.saveLevel(this.levelNumber, this.codeModelHtml.value, this.codeModelCss.value);

    if (isFinished)
      this.saveLevel(this.levelNumber+1, this.codeModelHtml.value, this.codeModelCss.value);

    this.loadLevel(this.levelNumber + 1);
  }

  public prevLevel() : void {
    if (this.levelNumber == 1) return;

    this.loadLevel(this.levelNumber - 1);
  }


  private loadLevel(levelNumber : number) : void {
    this.levelNumber = levelNumber;
    this.actualLevel = LEVELS.filter(item => item.id == this.levelNumber)[0];

    this.actualLevel.decodeCode = this.htmlUtils.decodeCode(this.actualLevel.templateCode);
    this.sanitizedBoardCodeExample = this.sanitizer.bypassSecurityTrustHtml(this.actualLevel?.decodeCode);
    this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.actualLevel?.description);

    let key = 'level-'+this.levelNumber+'-';

    let css = this.codeModelCss.value;
    let code = this.codeModelHtml.value;

    if (this.storageObject[key+'css']) css = this.storageObject[key+'css'];
    if (this.storageObject[key+'code']) code = this.storageObject[key+'code'];

    this.codeModelCss.value = css;
    this.codeModelHtml.value = code


    this.change();
  }

  

  private change(): void {

    let style = `<style>
    `+this.codeModelCss.value+`
    .example {
      `+this.actualLevel?.templateStyle+`
    }
    </style>`;

    let code = this.htmlUtils.decodeCode(this.codeModelHtml.value);

    this.sanitizedBoardCode = this.sanitizer.bypassSecurityTrustHtml(code);
    this.sanitizedBoardStyle = this.sanitizer.bypassSecurityTrustHtml(style);

    setTimeout(()=>this.calculateFinish(), 100);
  }


  private calculateFinish() : void {

    this.isFinished = false;
    this.isLastLevel = false;

    if (this.allItemsAreIdenticalPosition()) {
      this.isFinished = true;

      if (!this.checkLevelStored(this.levelNumber+1)) this.isLastLevel = true;

      return;
    }


  }

  private allItemsAreIdenticalPosition() : boolean {
    if (!this.actualLevel || !this.actualLevel.checkTags || this.actualLevel.checkTags.length == 0) return false;

    for (let tag of this.actualLevel.checkTags) {

      let list = document.querySelectorAll("#"+tag.replaceAll(' ', '_'));

      if (list == null) return false;
      if (list.length != 2) return false;

      let positionOne = list[0].getBoundingClientRect();
      let positionTwo = list[1].getBoundingClientRect();

      if (positionOne.x != positionTwo.x) return false;
      if (positionOne.y != positionTwo.y) return false;
      if (positionOne.width != positionTwo.width) return false;
      if (positionOne.height != positionTwo.height) return false;
    }
    
    return true;
  }



  
  

}