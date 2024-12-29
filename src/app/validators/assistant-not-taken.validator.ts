import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AnalyzeService } from '../services/analyze/analyze.service';

export class ValidateAssistantNameNotTaken {

    static createValidator(analyzeService: AnalyzeService, companyId: string): ValidatorFn {
        return (control: AbstractControl) => {
            return analyzeService.CheckIfAgentExists(companyId, control.value).subscribe(
                (
                    {
                        next: (res: boolean) => { return res ? { assistantTaken: true } : null }
                    }
                )
            )
        };
    }

    // static createValidator(analyzeService: AnalyzeService, companyId: string): ValidatorFn {
    //     return (control: AbstractControl): Observable<ValidationErrors | null> => {
    //         return analyzeService.CheckIfAgentExists(companyId, control.value).pipe(map((res: boolean) => { return res ? { 'assistantTaken': true } : null }))
    //     };
    // }



}