import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatterbotComponent } from './chatterbot.component';

describe('ChatterbotComponent', () => {
  let component: ChatterbotComponent;
  let fixture: ComponentFixture<ChatterbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatterbotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatterbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should Have a header for the ChatterBot conversation area.', () => {
    const fixture = TestBed.createComponent(ChatterbotComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#chatterBotTitle')?.textContent).toContain(
      'ChatterBot - An ask me anything chat bot'
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
