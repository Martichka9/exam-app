export class SignUpModel {
    constructor(
      public name : string,
      public email : string,
      public password : string,
      public confirmPass : string,
      public termsOfUse: number
    ) { }
  }