import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IGrocery, IPagedResults, IApiResponse } from '../../shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {

    baseUrl = environment.apiUrlBase;
    groceriesBaseUrl = this.baseUrl + '/api/groceries';

    constructor(private http: HttpClient, @Inject('Window') private window: Window) { }

    getGroceriesPage(page: number, pageSize: number): Observable<IPagedResults<IGrocery[]>> {
        return this.http.get<IGrocery[]>(
            `${this.groceriesBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const groceries = res.body as IGrocery[];
                    return {
                        results: groceries,
                        totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }

    getGroceries(): Observable<IGrocery[]> {
        return this.http.get<IGrocery[]>(this.groceriesBaseUrl)
            .pipe(
                map(groceries => {
                    return groceries;
                }),
                catchError(this.handleError)
            );
    }

    getGrocery(id: number): Observable<IGrocery> {
        return this.http.get<IGrocery>(this.groceriesBaseUrl + '/' + id)
            .pipe(
                map(grocery => {
                    return grocery;
                }),
                catchError(this.handleError)
            );
    }

    insertGrocery(grocery: IGrocery): Observable<IGrocery> {
        return this.http.post<IGrocery>(this.groceriesBaseUrl, grocery)
            .pipe(catchError(this.handleError));
    }

    updateGrocery(grocery: IGrocery): Observable<boolean> {
        return this.http.put<IApiResponse>(this.groceriesBaseUrl + '/' + grocery.id, grocery)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteGrocery(id: number): Observable<boolean> {
        return this.http.delete<IApiResponse>(this.groceriesBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }

}
