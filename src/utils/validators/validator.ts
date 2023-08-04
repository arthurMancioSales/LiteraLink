import { CustomError } from "../customError";

class Validator {
    data: number | string ;

    constructor(data: any ){
        this.data = data;
    }
}

class StringValidator extends Validator {
    constructor(data:string){
        if(typeof data !== "string"){
            throw new CustomError("O valor passado não é uma string", 400);
        }
        super(data)
    }

}

export class NumberValidator extends Validator {
    constructor(data:number){
        if(typeof data !== "number"){
            throw new CustomError("O valor passado não é uma number", 400);
        }
        super(data)
    }
}

abstract class RegexValidator extends StringValidator {
    protected _regex: RegExp = new RegExp("");
  
    constructor(data: string, message: string) {
      super(data);
      if (!this.regex.test(data)) throw new CustomError(message, 400);
    }
  
    protected get regex(): RegExp {
      return this._regex;
    }
}

export class EmailValidator extends RegexValidator {
    constructor(data: string) {
      super(data, "Error: invalid Email.");
    }
  
    protected get regex(): RegExp {
      return /^(\w+(\.\w+)*@\w+(\.\w{2,})+(\.\w{2}){0,1})$/gim;
    }
}

export class NameValidator extends RegexValidator {
    constructor(data: string) {
      super(data, "Error: invalid Name.");
    }
  
    protected get regex(): RegExp {
      return /^[a-zA-Z_][a-zA-Z0-9_]*$/gim;
    }
}

export class PasswordValidator extends RegexValidator {
    constructor(data: string) {
      super(data, "Error: invalid Password.");
    }
  
    protected get regex(): RegExp {
      return /^[a-zA-Z0-9_]+$/gim;
    }
}
export class NameCommunityValidator extends RegexValidator {
    constructor(data: string) {
      super(data, "Error: invalid Password.");
    }
  
    protected get regex(): RegExp {
      return /^[a-zA-Z0-9áéíóúâêîôûãõÁÉÍÓÚÂÊÎÔÛÃÕàèìòùÀÈÌÒÙçÇäëïöüÄËÏÖÜ  ]+$/gim;
    }
}

// validador de data

//2023-05-17T10:30:00.000Z verifica datas desse formato:
///^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

//01/01/2023 verifica datas desse formato:
///^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:0?[1-9]|1[0-2])\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/
