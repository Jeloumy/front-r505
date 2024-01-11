import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ApiService } from '../../shared/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let apiService: ApiService;
  let mockActivatedRouteParams: BehaviorSubject<any>;

  beforeEach(async () => {
    mockActivatedRouteParams = new BehaviorSubject({ req: 'initialQuery' });

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: ActivatedRoute, useValue: { params: mockActivatedRouteParams } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchTournament on route params change', () => {
    spyOn(component, 'searchTournament').and.callThrough();

    const testQuery = 'testQuery';
    mockActivatedRouteParams.next({ req: testQuery });

    expect(component.searchTournament).toHaveBeenCalledWith(testQuery);
  });

  it('should update searchResults on successful search', async () => {
    const mockSearchResults = [{ name: 'Tournament1' }, { name: 'Tournament2' }];
    spyOn(apiService, 'searchTournament').and.returnValue(Promise.resolve(mockSearchResults));

    await component.searchTournament('testQuery');

    expect(component.searchResults).toEqual(mockSearchResults);
    expect(apiService.searchTournament).toHaveBeenCalledWith('testQuery');
  });
});
