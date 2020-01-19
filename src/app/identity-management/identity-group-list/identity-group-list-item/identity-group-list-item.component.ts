import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-identity-group-list-item',
  templateUrl: './identity-group-list-item.component.html',
  styleUrls: ['./identity-group-list-item.component.scss']
})
export class IdentityGroupListItemComponent implements OnInit {
  @Input() group: any;
  @Output() getChildren =  new EventEmitter<any>();
  @Output() getIdentities = new EventEmitter<any>();
  @Output() selectIdentity = new EventEmitter<any>();
  @Output() deleteIdentity = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emitGetIdentities(group) {
    this.getIdentities.emit(group);
  }

  emitGetChildren(group) {
    this.getChildren.emit(group);
  }

  emitSelectIdentity(identity) {
    this.selectIdentity.emit(identity);
  }

  emitDeleteIdentity(identity) {
    this.deleteIdentity.emit(identity);
  }

  formatIdTag(name) {
    return name.replace(/\s+/g, '-').toLowerCase()
  }

}
