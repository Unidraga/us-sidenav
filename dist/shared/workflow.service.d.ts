import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
export declare class WorkflowService {
    private http;
    private baseRoute;
    private URL_GET_DIAGRAMS;
    private URL_SAVE_DIAGRAM;
    private URL_LOAD_DIAGRAM;
    constructor(http: HttpClient);
    getDiagrams(): Observable<Object>;
}
