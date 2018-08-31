import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
// import { Workflow } from '../workflow';
// Classes
// import { Email } from '../data/system/email';
// import { User } from '../data/identity/user';
var WorkflowService = /** @class */ (function () {
    function WorkflowService(http) {
        this.http = http;
        this.baseRoute = '/workflow';
        this.URL_GET_DIAGRAMS = environment.API_URL + this.baseRoute + '/diagrams';
        this.URL_SAVE_DIAGRAM = environment.API_URL + this.baseRoute + '/save';
        this.URL_LOAD_DIAGRAM = environment.API_URL + this.baseRoute + '/load';
    }
    WorkflowService.prototype.getDiagrams = function () {
        // const body = JSON.stringify({ email });
        var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(this.URL_GET_DIAGRAMS, { headers: headers });
    };
    WorkflowService.decorators = [
        { type: Injectable },
    ];
    // loadDiagram(email) {
    //   const body = JSON.stringify({ email });
    //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //   return this.http.post(this.URL_LOAD_DIAGRAM, body, { headers: headers });
    // }
    // saveDiagram(workflow: Workflow) {
    //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //   return this.http.post(this.URL_SAVE_DIAGRAM, workflow, { headers: headers });
    // }
    /** @nocollapse */
    WorkflowService.ctorParameters = function () { return [
        { type: HttpClient, },
    ]; };
    return WorkflowService;
}());
export { WorkflowService };
//# sourceMappingURL=workflow.service.js.map