//#region Uncomment service to enable HttpInterceptor
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
// import { tap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

// // Use Http_Interceptor if needed for Api Call
// export class AuthInterceptorService implements HttpInterceptor {

//     constructor(private toastr: ToastrService) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         let token = localStorage.getItem('token');
//         token = token || "";
//         const modifiedRequest = req.clone({ headers: req.headers.append('Authorization', `Bearer ${token}`) });

//         //return next.handle(modifiedRequest);

//         return next.handle(modifiedRequest).pipe(
//             tap(evt => { }),
//             catchError((err: any) => {
//                 if (err instanceof HttpErrorResponse) {
//                     try {
//                         this.toastr.error(err.error.message, err.error.title);
//                     } catch (e) {
//                         this.toastr.error('An error occurred', '');
//                     }
//                 }
//                 return of(err);
//             })
//         );
//     }
// }
//#endregion