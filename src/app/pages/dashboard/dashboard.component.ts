import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AccountHistoryApiService } from '../../api/account-history';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly accountHistoryApiService = inject(AccountHistoryApiService);

  private readonly accountHistory$ = this.accountHistoryApiService.getAccountHistory();
  protected readonly accountHistory = toSignal(this.accountHistory$);
}
