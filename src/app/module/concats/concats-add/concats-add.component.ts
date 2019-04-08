import { ENTER, COMMA } from '@angular/cdk/keycodes'
import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    templateUrl: './concats-add.html',
    styleUrls: ['./concats-add.scss']
})
export class ConcatsAddDialogComponet{
    protected visible = true;

    protected selectable = true;    
    protected removable = true;
    protected addOnBlur = true; //

    public fruitCtrl = new FormControl;
    public separatorKeysCodes: Array<number> = [ ENTER, COMMA ];
    
    public fruits: string[] = [];
    public filteredFruits$: Observable<string[]>;
    public allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    public constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public dialogRef: MatDialogRef<ConcatsAddDialogComponet>){
        
        console.info(data);

        this.filteredFruits$ = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));

        this.dialogRef.backdropClick().subscribe(event=>{
            console.info(event);
        })
    }

    add($event){}
    remove($event){

    }
    selected($event){}

    private _filter(value: string): string[]{
        return this.allFruits;
    }
}
