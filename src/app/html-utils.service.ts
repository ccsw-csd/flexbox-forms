import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlUtilsService {

  parser : DOMParser;
 
  constructor() { 

    this.parser  = new DOMParser();

  }


  public decodeCode(code? : string) : string {

    if (!code) return '';

    code = this.replaceAutocloseTag(code);
    code = this.replaceEmptyTag(code);
    code = this.replaceInputTag(code);
    code = this.replaceSelectTag(code);
    code = this.replaceTextareaTag(code);
    code = this.replaceCheckboxTag(code);
    code = this.replaceButtonTag(code);
    code = this.replaceRadioTag(code);

    return code;
  }

  private replaceAutocloseTag(code: string) : string {

    while (code.indexOf("/>") > 0) {

      let indexEnd = code.indexOf("/>");
      let indexStart = code.lastIndexOf("<", indexEnd);

      let indexMiddle = code.indexOf(" ", indexStart);

      let tag = code.substring(indexStart+1, indexMiddle);


      let firstCode = code.substring(0, indexEnd);
      let secondCode = code.substring(indexEnd+2);

      code = firstCode + '></'+tag+'>' + secondCode;
    }

    return code;
  }

  private replaceEmptyTag(code: string) : string {
    return code.replaceAll('></', '> </');
  }

  private replaceRadioTag(code: string) : string {
    const htmlDoc = this.parser.parseFromString('<root>' + code + ' </root>', 'text/xml');
    let list = htmlDoc.getElementsByTagName("radio");
    if (list == null || list.length == 0) return code;
    
    let newCodeTemplate = '<fieldset class="{{class}}" id="{{id}}"><legend class="large-label">{{label}}</legend>{{options}}</fieldset>';
    
    code = htmlDoc.documentElement.innerHTML;

    for (let i = 0; i < list.length; i++) {      
      let element = list[i];
      let newCode = newCodeTemplate.toString();

      newCode = this.generateIdAttribute(newCode, element);
      newCode = this.replaceAttribute(newCode, element, 'class');
      newCode = this.replaceAttribute(newCode, element, 'label');

      let attribute = element.getAttribute('options');
      if (attribute) {

        let options = attribute.split(',');
        let optionsHTML = '';

        for (let option of options) {
          optionsHTML += '<input type="radio" name="radio_'+i+'"/><label class="small-label">'+option+'</label>';
        }
        
        newCode = newCode.replace("{{options}}", optionsHTML);
      }

      code = code.replace(element.outerHTML, newCode);
    }      

    return code;
  }


  private replaceSelectTag(code: string) : string {
    const htmlDoc = this.parser.parseFromString('<root>' + code + ' </root>', 'text/xml');
    let list = htmlDoc.getElementsByTagName("select");
    if (list == null || list.length == 0) return code;
    
    let newCodeTemplate = '<div class="{{class}}" id="{{id}}"><label for="comp" class="large-label">{{label}}</label><select id="comp">{{options}}</select></div>';

    code = htmlDoc.documentElement.innerHTML;

    for (let i = 0; i < list.length; i++) {      
      let element = list[i];
      let newCode = newCodeTemplate.toString();

      newCode = this.generateIdAttribute(newCode, element);
      newCode = this.replaceAttribute(newCode, element, 'class');
      newCode = this.replaceAttribute(newCode, element, 'label');

      let attribute = element.getAttribute('options');
      if (attribute) {

        let options = attribute.split(',');
        let optionsHTML = '';

        for (let option of options) {
          optionsHTML += '<option value="'+option+'">'+option+'</option>';
        }

        newCode = newCode.replace("{{options}}", optionsHTML);
      }

      code = code.replace(element.outerHTML, newCode);
    }      

    return code;
  }


  private replaceInputTag(code: string) : string {
    const htmlDoc = this.parser.parseFromString('<root>' + code + ' </root>', 'text/xml');
    let list = htmlDoc.getElementsByTagName("input");
    if (list == null || list.length == 0) return code;
    
    let newCodeTemplate = '<div class="{{class}}" id="{{id}}"><label class="large-label">{{label}}</label><input type="text" placeholder="Write a {{label}} ..." /></div>';

    code = htmlDoc.documentElement.innerHTML;

    for (let i = 0; i < list.length; i++) {
      
      let element = list[i];
      let newCode = newCodeTemplate.toString();
      
      newCode = this.generateIdAttribute(newCode, element);
      newCode = this.replaceAttribute(newCode, element, 'class');
      newCode = this.replaceAttribute(newCode, element, 'label');

      code = code.replace(element.outerHTML, newCode);
    }      

    return code;
  }


  private replaceTextareaTag(code: string) : string {
    const htmlDoc = this.parser.parseFromString('<root>' + code + ' </root>', 'text/xml');
    let list = htmlDoc.getElementsByTagName("textarea");
    if (list == null || list.length == 0) return code;
    
    let newCodeTemplate = '<div class="{{class}}" id="{{id}}"><label class="large-label">{{label}}</label><textarea>Write a {{label}} ...</textarea></div>';

    code = htmlDoc.documentElement.innerHTML;

    for (let i = 0; i < list.length; i++) {
      
      let element = list[i];
      let newCode = newCodeTemplate.toString();

      newCode = this.generateIdAttribute(newCode, element);
      newCode = this.replaceAttribute(newCode, element, 'class');
      newCode = this.replaceAttribute(newCode, element, 'label');

      code = code.replace(element.outerHTML, newCode);
    }          

    return code;
  }  

  private replaceCheckboxTag(code: string) : string {
    const htmlDoc = this.parser.parseFromString('<root>' + code + ' </root>', 'text/xml');
    let list = htmlDoc.getElementsByTagName("checkbox");
    if (list == null || list.length == 0) return code;
    
    let newCodeTemplate = '<div class="{{class}}" id="{{id}}"><input type="checkbox" /><label class="small-label">{{label}}</label></div>';

    code = htmlDoc.documentElement.innerHTML;

    for (let i = 0; i < list.length; i++) {
      
      let element = list[i];
      let newCode = newCodeTemplate.toString();

      newCode = this.generateIdAttribute(newCode, element);
      newCode = this.replaceAttribute(newCode, element, 'class');
      newCode = this.replaceAttribute(newCode, element, 'label');

      code = code.replace(element.outerHTML, newCode);
    }      

    return code;
  }  


  private replaceButtonTag(code: string) : string {
    const htmlDoc = this.parser.parseFromString('<root>' + code + ' </root>', 'text/xml');
    let list = htmlDoc.getElementsByTagName("button");
    if (list == null || list.length == 0) return code;
    
    let newCodeTemplate = '<div class="{{class}}" style="display:flex; flex-direction: row;" id="{{id}}"><button class="{{class}}" type="{{type}}">{{label}}</button></div>';

    code = htmlDoc.documentElement.innerHTML;

    for (let i = 0; i < list.length; i++) {
      
      let element = list[i];
      let newCode = newCodeTemplate.toString();

      newCode = this.generateIdAttribute(newCode, element);
      newCode = this.replaceAttribute(newCode, element, 'class');
      newCode = this.replaceAttribute(newCode, element, 'label');
      newCode = this.replaceAttribute(newCode, element, 'type', 'primary');

      code = code.replace(element.outerHTML, newCode);
    }      

    return code;
  }  


  private generateIdAttribute(code: string, element: Element) : string {

    let attribute = element.getAttribute("label");
    if (!attribute) return code;

    code = code.replace("{{id}}", attribute.replaceAll(' ', '_'));

    return code;
  }

  private replaceAttribute(code: string, element: Element, tag: string, defaultValue?: string) : string {

    if (!defaultValue) defaultValue = '';

    let attribute = element.getAttribute(tag);
    if (!attribute) attribute = defaultValue;

    code = code.replaceAll("{{"+tag+"}}", attribute);

    return code;
  }

   
}
