import { Injectable } from '@angular/core';
import { Skill } from "../_models/skill.model";

@Injectable()
export class UserProfileEditService {

  private selectedItem: Skill;

  setSelectItem(item: Skill) {
    this.selectedItem = item;
  }

  getSelectedItem() {
    return this.selectedItem;
  }

  clearSelectedItem() {
    this.selectedItem = null;
  }
}
