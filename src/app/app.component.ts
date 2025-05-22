import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './components/shared/top-menu/top-menu.component';
import { CadastroTarefasComponent } from './components/pages/cadastro-tarefas/cadastro-tarefas.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopMenuComponent,
    CadastroTarefasComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projetoAgendaWeb';
}
