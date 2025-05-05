import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MainPageContentApiService } from '../../api/main-page-content';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class MainComponent {
  private readonly mainPageContent$ = inject(MainPageContentApiService).getMainPageContent();

  protected readonly mainPageContent = toSignal(this.mainPageContent$);
}
