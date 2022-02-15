/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NbFirebaseBaseStrategy } from '../base/firebase-base.strategy';
import { NbFirebaseIdentityProviderStrategyOptions } from '../base/firebase-identity-provider-strategy.options';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as i0 from "@angular/core";
export class NbFirebaseGoogleStrategy extends NbFirebaseBaseStrategy {
    constructor() {
        super(...arguments);
        this.defaultOptions = new NbFirebaseIdentityProviderStrategyOptions();
    }
    static setup(options) {
        return [NbFirebaseGoogleStrategy, options];
    }
    authenticate(data) {
        const module = 'authenticate';
        const provider = new firebase.auth.GoogleAuthProvider();
        const scopes = this.getOption('scopes');
        scopes.forEach((scope) => provider.addScope(scope));
        provider.setCustomParameters(this.getOption('customParameters'));
        return from(this.afAuth.signInWithPopup(provider)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
}
NbFirebaseGoogleStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbFirebaseGoogleStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NbFirebaseGoogleStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbFirebaseGoogleStrategy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbFirebaseGoogleStrategy, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtZ29vZ2xlLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2ZyYW1ld29yay9maXJlYmFzZS1hdXRoL3N0cmF0ZWdpZXMvZ29vZ2xlL2ZpcmViYXNlLWdvb2dsZS5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdkQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0scURBQXFELENBQUM7QUFFaEgsT0FBTyxRQUFRLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsT0FBTyxzQkFBc0IsQ0FBQzs7QUFHOUIsTUFBTSxPQUFPLHdCQUF5QixTQUFRLHNCQUFzQjtJQURwRTs7UUFFWSxtQkFBYyxHQUE4QyxJQUFJLHlDQUF5QyxFQUFFLENBQUM7S0FrQnZIO0lBaEJDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBa0Q7UUFDN0QsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBVTtRQUNyQixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDeEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBRWpFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNyRCxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ3BELFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7O3FIQWxCVSx3QkFBd0I7eUhBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQURwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEFrdmVvLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOYkF1dGhTdHJhdGVneUNsYXNzLCBOYkF1dGhSZXN1bHQsIE5iQXV0aFN0cmF0ZWd5T3B0aW9ucyB9IGZyb20gJ0BuZWJ1bGFyL2F1dGgnO1xuXG5pbXBvcnQgeyBOYkZpcmViYXNlQmFzZVN0cmF0ZWd5IH0gZnJvbSAnLi4vYmFzZS9maXJlYmFzZS1iYXNlLnN0cmF0ZWd5JztcbmltcG9ydCB7IE5iRmlyZWJhc2VJZGVudGl0eVByb3ZpZGVyU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vYmFzZS9maXJlYmFzZS1pZGVudGl0eS1wcm92aWRlci1zdHJhdGVneS5vcHRpb25zJztcblxuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0ICdmaXJlYmFzZS9jb21wYXQvYXV0aCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOYkZpcmViYXNlR29vZ2xlU3RyYXRlZ3kgZXh0ZW5kcyBOYkZpcmViYXNlQmFzZVN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIGRlZmF1bHRPcHRpb25zOiBOYkZpcmViYXNlSWRlbnRpdHlQcm92aWRlclN0cmF0ZWd5T3B0aW9ucyA9IG5ldyBOYkZpcmViYXNlSWRlbnRpdHlQcm92aWRlclN0cmF0ZWd5T3B0aW9ucygpO1xuXG4gIHN0YXRpYyBzZXR1cChvcHRpb25zOiBOYkZpcmViYXNlSWRlbnRpdHlQcm92aWRlclN0cmF0ZWd5T3B0aW9ucyk6IFtOYkF1dGhTdHJhdGVneUNsYXNzLCBOYkF1dGhTdHJhdGVneU9wdGlvbnNdIHtcbiAgICByZXR1cm4gW05iRmlyZWJhc2VHb29nbGVTdHJhdGVneSwgb3B0aW9uc107XG4gIH1cblxuICBhdXRoZW50aWNhdGUoZGF0YT86IGFueSk6IE9ic2VydmFibGU8TmJBdXRoUmVzdWx0PiB7XG4gICAgY29uc3QgbW9kdWxlID0gJ2F1dGhlbnRpY2F0ZSc7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcbiAgICBjb25zdCBzY29wZXMgPSB0aGlzLmdldE9wdGlvbignc2NvcGVzJyk7XG4gICAgc2NvcGVzLmZvckVhY2goKHNjb3BlKSA9PiBwcm92aWRlci5hZGRTY29wZShzY29wZSkpO1xuICAgIHByb3ZpZGVyLnNldEN1c3RvbVBhcmFtZXRlcnModGhpcy5nZXRPcHRpb24oJ2N1c3RvbVBhcmFtZXRlcnMnKSk7XG5cbiAgICByZXR1cm4gZnJvbSh0aGlzLmFmQXV0aC5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChyZXMpID0+IHRoaXMucHJvY2Vzc1N1Y2Nlc3MocmVzLCBtb2R1bGUpKSxcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aGlzLnByb2Nlc3NGYWlsdXJlKGVycm9yLCBtb2R1bGUpKSxcbiAgICApO1xuICB9XG59XG4iXX0=