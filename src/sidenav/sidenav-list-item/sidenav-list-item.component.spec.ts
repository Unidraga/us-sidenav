import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavListItemComponent } from './sidenav-list-item.component';

describe('SideNavListItemComponent', () => {
  let component: SideNavListItemComponent;
  let fixture: ComponentFixture<SideNavListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
