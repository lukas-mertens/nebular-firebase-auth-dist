/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { of as observableOf, from } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { NbAuthResult } from '@nebular/auth';
import { NbFirebaseBaseStrategy } from '../base/firebase-base.strategy';
import { firebasePasswordStrategyOptions, } from './firebase-password-strategy.options';
import * as i0 from "@angular/core";
export class NbFirebasePasswordStrategy extends NbFirebaseBaseStrategy {
    constructor() {
        super(...arguments);
        this.defaultOptions = firebasePasswordStrategyOptions;
    }
    static setup(options) {
        return [NbFirebasePasswordStrategy, options];
    }
    authenticate({ email, password }) {
        const module = 'login';
        return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
    refreshToken(data) {
        const module = 'refreshToken';
        return this.afAuth.authState.pipe(take(1), switchMap((user) => {
            if (user == null) {
                return observableOf(new NbAuthResult(false, null, this.getOption(`${module}.redirect.failure`), [
                    "There is no logged in user so refresh of id token isn't possible",
                ]));
            }
            return this.refreshIdToken(user, module);
        }));
    }
    register({ email, password }) {
        const module = 'register';
        return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(switchMap((res) => this.processSuccess(res, module)), catchError((error) => this.processFailure(error, module)));
    }
    requestPassword({ email }) {
        const module = 'requestPassword';
        return from(this.afAuth.sendPasswordResetEmail(email)).pipe(map(() => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`));
        }), catchError((error) => this.processFailure(error, module)));
    }
    resetPassword({ code, password }) {
        const module = 'resetPassword';
        return from(this.afAuth.confirmPasswordReset(code, password)).pipe(map(() => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`));
        }), catchError((error) => this.processFailure(error, module)));
    }
    updatePassword(user, password, module) {
        return from(user.updatePassword(password)).pipe(map((token) => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`), this.createToken(token));
        }), catchError((error) => this.processFailure(error, module)));
    }
    refreshIdToken(user, module) {
        return from(user.getIdToken(true)).pipe(map((token) => {
            return new NbAuthResult(true, null, this.getOption(`${module}.redirect.success`), [], this.getOption(`${module}.defaultMessages`), this.createToken(token));
        }), catchError((error) => this.processFailure(error, module)));
    }
}
NbFirebasePasswordStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbFirebasePasswordStrategy, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
NbFirebasePasswordStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbFirebasePasswordStrategy });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: NbFirebasePasswordStrategy, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2UtcGFzc3dvcmQuc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvZnJhbWV3b3JrL2ZpcmViYXNlLWF1dGgvc3RyYXRlZ2llcy9wYXNzd29yZC9maXJlYmFzZS1wYXNzd29yZC5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQWMsRUFBRSxJQUFJLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBOEMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3hFLE9BQU8sRUFDTCwrQkFBK0IsR0FFaEMsTUFBTSxzQ0FBc0MsQ0FBQzs7QUFHOUMsTUFBTSxPQUFPLDBCQUEyQixTQUFRLHNCQUFzQjtJQUR0RTs7UUFFWSxtQkFBYyxHQUFzQywrQkFBK0IsQ0FBQztLQXNHL0Y7SUFwR0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUEwQztRQUNyRCxPQUFPLENBQUMsMEJBQTBCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQU87UUFDbkMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2RSxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQ3BELFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBVTtRQUNyQixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQy9CLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqQixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ2hCLE9BQU8sWUFBWSxDQUNqQixJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLG1CQUFtQixDQUFDLEVBQUU7b0JBQzFFLGtFQUFrRTtpQkFDbkUsQ0FBQyxDQUNILENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFPO1FBQy9CLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLDhCQUE4QixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDM0UsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUNwRCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQzFELENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFPO1FBQzVCLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3pELEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDUCxPQUFPLElBQUksWUFBWSxDQUNyQixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxNQUFNLG1CQUFtQixDQUFDLEVBQzVDLEVBQUUsRUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxDQUM1QyxDQUFDO1FBQ0osQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUMxRCxDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWEsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDOUIsTUFBTSxNQUFNLEdBQUcsZUFBZSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNoRSxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsT0FBTyxJQUFJLFlBQVksQ0FDckIsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxFQUM1QyxFQUFFLEVBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsQ0FDNUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7SUFFUyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNO1FBQzdDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzdDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1osT0FBTyxJQUFJLFlBQVksQ0FDckIsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxFQUM1QyxFQUFFLEVBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsRUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FDeEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7SUFFUyxjQUFjLENBQUMsSUFBbUIsRUFBRSxNQUFNO1FBQ2xELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3JDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1osT0FBTyxJQUFJLFlBQVksQ0FDckIsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxFQUM1QyxFQUFFLEVBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsRUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FDeEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDMUQsQ0FBQztJQUNKLENBQUM7O3VIQXRHVSwwQkFBMEI7MkhBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUR0QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9jb21wYXQvYXBwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIGFzIG9ic2VydmFibGVPZiwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOYkF1dGhTdHJhdGVneU9wdGlvbnMsIE5iQXV0aFN0cmF0ZWd5Q2xhc3MsIE5iQXV0aFJlc3VsdCB9IGZyb20gJ0BuZWJ1bGFyL2F1dGgnO1xuXG5pbXBvcnQgeyBOYkZpcmViYXNlQmFzZVN0cmF0ZWd5IH0gZnJvbSAnLi4vYmFzZS9maXJlYmFzZS1iYXNlLnN0cmF0ZWd5JztcbmltcG9ydCB7XG4gIGZpcmViYXNlUGFzc3dvcmRTdHJhdGVneU9wdGlvbnMsXG4gIE5iRmlyZWJhc2VQYXNzd29yZFN0cmF0ZWd5T3B0aW9ucyxcbn0gZnJvbSAnLi9maXJlYmFzZS1wYXNzd29yZC1zdHJhdGVneS5vcHRpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5iRmlyZWJhc2VQYXNzd29yZFN0cmF0ZWd5IGV4dGVuZHMgTmJGaXJlYmFzZUJhc2VTdHJhdGVneSB7XG4gIHByb3RlY3RlZCBkZWZhdWx0T3B0aW9uczogTmJGaXJlYmFzZVBhc3N3b3JkU3RyYXRlZ3lPcHRpb25zID0gZmlyZWJhc2VQYXNzd29yZFN0cmF0ZWd5T3B0aW9ucztcblxuICBzdGF0aWMgc2V0dXAob3B0aW9uczogTmJGaXJlYmFzZVBhc3N3b3JkU3RyYXRlZ3lPcHRpb25zKTogW05iQXV0aFN0cmF0ZWd5Q2xhc3MsIE5iQXV0aFN0cmF0ZWd5T3B0aW9uc10ge1xuICAgIHJldHVybiBbTmJGaXJlYmFzZVBhc3N3b3JkU3RyYXRlZ3ksIG9wdGlvbnNdO1xuICB9XG5cbiAgYXV0aGVudGljYXRlKHsgZW1haWwsIHBhc3N3b3JkIH06IGFueSk6IE9ic2VydmFibGU8TmJBdXRoUmVzdWx0PiB7XG4gICAgY29uc3QgbW9kdWxlID0gJ2xvZ2luJztcbiAgICByZXR1cm4gZnJvbSh0aGlzLmFmQXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChyZXMpID0+IHRoaXMucHJvY2Vzc1N1Y2Nlc3MocmVzLCBtb2R1bGUpKSxcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aGlzLnByb2Nlc3NGYWlsdXJlKGVycm9yLCBtb2R1bGUpKSxcbiAgICApO1xuICB9XG5cbiAgcmVmcmVzaFRva2VuKGRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPE5iQXV0aFJlc3VsdD4ge1xuICAgIGNvbnN0IG1vZHVsZSA9ICdyZWZyZXNoVG9rZW4nO1xuICAgIHJldHVybiB0aGlzLmFmQXV0aC5hdXRoU3RhdGUucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKHVzZXIpID0+IHtcbiAgICAgICAgaWYgKHVzZXIgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlT2YoXG4gICAgICAgICAgICBuZXcgTmJBdXRoUmVzdWx0KGZhbHNlLCBudWxsLCB0aGlzLmdldE9wdGlvbihgJHttb2R1bGV9LnJlZGlyZWN0LmZhaWx1cmVgKSwgW1xuICAgICAgICAgICAgICBcIlRoZXJlIGlzIG5vIGxvZ2dlZCBpbiB1c2VyIHNvIHJlZnJlc2ggb2YgaWQgdG9rZW4gaXNuJ3QgcG9zc2libGVcIixcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVmcmVzaElkVG9rZW4odXNlciwgbW9kdWxlKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICByZWdpc3Rlcih7IGVtYWlsLCBwYXNzd29yZCB9OiBhbnkpOiBPYnNlcnZhYmxlPE5iQXV0aFJlc3VsdD4ge1xuICAgIGNvbnN0IG1vZHVsZSA9ICdyZWdpc3Rlcic7XG4gICAgcmV0dXJuIGZyb20odGhpcy5hZkF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZCkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHJlcykgPT4gdGhpcy5wcm9jZXNzU3VjY2VzcyhyZXMsIG1vZHVsZSkpLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRoaXMucHJvY2Vzc0ZhaWx1cmUoZXJyb3IsIG1vZHVsZSkpLFxuICAgICk7XG4gIH1cblxuICByZXF1ZXN0UGFzc3dvcmQoeyBlbWFpbCB9OiBhbnkpOiBPYnNlcnZhYmxlPE5iQXV0aFJlc3VsdD4ge1xuICAgIGNvbnN0IG1vZHVsZSA9ICdyZXF1ZXN0UGFzc3dvcmQnO1xuICAgIHJldHVybiBmcm9tKHRoaXMuYWZBdXRoLnNlbmRQYXNzd29yZFJlc2V0RW1haWwoZW1haWwpKS5waXBlKFxuICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBOYkF1dGhSZXN1bHQoXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICBudWxsLFxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uKGAke21vZHVsZX0ucmVkaXJlY3Quc3VjY2Vzc2ApLFxuICAgICAgICAgIFtdLFxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uKGAke21vZHVsZX0uZGVmYXVsdE1lc3NhZ2VzYCksXG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aGlzLnByb2Nlc3NGYWlsdXJlKGVycm9yLCBtb2R1bGUpKSxcbiAgICApO1xuICB9XG5cbiAgcmVzZXRQYXNzd29yZCh7IGNvZGUsIHBhc3N3b3JkIH0pOiBPYnNlcnZhYmxlPE5iQXV0aFJlc3VsdD4ge1xuICAgIGNvbnN0IG1vZHVsZSA9ICdyZXNldFBhc3N3b3JkJztcbiAgICByZXR1cm4gZnJvbSh0aGlzLmFmQXV0aC5jb25maXJtUGFzc3dvcmRSZXNldChjb2RlLCBwYXNzd29yZCkpLnBpcGUoXG4gICAgICBtYXAoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE5iQXV0aFJlc3VsdChcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb24oYCR7bW9kdWxlfS5yZWRpcmVjdC5zdWNjZXNzYCksXG4gICAgICAgICAgW10sXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb24oYCR7bW9kdWxlfS5kZWZhdWx0TWVzc2FnZXNgKSxcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRoaXMucHJvY2Vzc0ZhaWx1cmUoZXJyb3IsIG1vZHVsZSkpLFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlUGFzc3dvcmQodXNlciwgcGFzc3dvcmQsIG1vZHVsZSkge1xuICAgIHJldHVybiBmcm9tKHVzZXIudXBkYXRlUGFzc3dvcmQocGFzc3dvcmQpKS5waXBlKFxuICAgICAgbWFwKCh0b2tlbikgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IE5iQXV0aFJlc3VsdChcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb24oYCR7bW9kdWxlfS5yZWRpcmVjdC5zdWNjZXNzYCksXG4gICAgICAgICAgW10sXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb24oYCR7bW9kdWxlfS5kZWZhdWx0TWVzc2FnZXNgKSxcbiAgICAgICAgICB0aGlzLmNyZWF0ZVRva2VuKHRva2VuKSxcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRoaXMucHJvY2Vzc0ZhaWx1cmUoZXJyb3IsIG1vZHVsZSkpLFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVmcmVzaElkVG9rZW4odXNlcjogZmlyZWJhc2UuVXNlciwgbW9kdWxlKTogT2JzZXJ2YWJsZTxOYkF1dGhSZXN1bHQ+IHtcbiAgICByZXR1cm4gZnJvbSh1c2VyLmdldElkVG9rZW4odHJ1ZSkpLnBpcGUoXG4gICAgICBtYXAoKHRva2VuKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgTmJBdXRoUmVzdWx0KFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbihgJHttb2R1bGV9LnJlZGlyZWN0LnN1Y2Nlc3NgKSxcbiAgICAgICAgICBbXSxcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbihgJHttb2R1bGV9LmRlZmF1bHRNZXNzYWdlc2ApLFxuICAgICAgICAgIHRoaXMuY3JlYXRlVG9rZW4odG9rZW4pLFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gdGhpcy5wcm9jZXNzRmFpbHVyZShlcnJvciwgbW9kdWxlKSksXG4gICAgKTtcbiAgfVxufVxuIl19