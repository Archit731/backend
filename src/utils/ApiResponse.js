//whenever we gonna send any resposne we gonna send thru this class
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; //api ke servers ke status code hote hai
    //informational responses(100 - 199)
    //successful responses(200 - 299)
    //redirection messages(300 - 399)         these are standards only not hard and fast rule
    //client error responses(400 - 499)
    //server error responses(500 - 599)
  }
}

export { ApiResponse };
