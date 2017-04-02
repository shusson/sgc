import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgrbDownloadBannerComponent } from './mgrb-download-banner.component';
import { MaterialModule } from '@angular/material';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MockLocalStorageService } from '../../../mocks/local-storage.mock';

describe('MgrbDownloadBannerComponent', () => {
    let component: MgrbDownloadBannerComponent;
    let fixture: ComponentFixture<MgrbDownloadBannerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule],
            declarations: [MgrbDownloadBannerComponent],
            providers: [
                {
                    provide: LocalStorageService,
                    useValue: new MockLocalStorageService()
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MgrbDownloadBannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
