import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import {API_URL} from "../../../environments/environment.development";

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ajout de HttpClientTestingModule aux imports
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Assurez-vous que toutes les requêtes ont été traitées
  });

  // Test existant pour 'inscription'
  it('devrait envoyer une requête POST pour l\'inscription', () => {
    const mockUserData = { username: 'testuser', password: 'testpass' };
    const mockResponse = { success: true };

    service.inscription(mockUserData).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${API_URL}/register`
    });

    expect(req.request.body).toEqual(mockUserData);
    req.flush(mockResponse);
  });


  // Test pour 'login'
  it('devrait envoyer une requête POST pour le login', () => {
    const mockLoginData = { username: 'user', password: 'password' };
    const mockResponse = { token: '12345' };

    service.login(mockLoginData).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Test pour 'tournoi'
  it('devrait envoyer une requête POST pour créer un tournoi', () => {
    const mockTournamentData = { name: 'Tournament', game: 'Game' };
    const mockResponse = { success: true };

    service.tournoi(mockTournamentData).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}/tournoi`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Test pour 'uploadFile'
  it('devrait envoyer une requête POST pour uploader un fichier', () => {
    const mockFormData = new FormData();
    mockFormData.append('file', new Blob(), 'test.png');
    const mockResponse = { success: true };

    service.uploadFile(mockFormData).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}/jeu`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

// Test pour 'searchTournament'
  it('devrait envoyer une requête GET pour rechercher un tournoi', () => {
    const searchTerm = 'chess';
    const mockResponse = [{ name: 'Chess Tournament' }];

    service.searchTournament(searchTerm).then(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${API_URL}/tournoi/search/${searchTerm}?`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
