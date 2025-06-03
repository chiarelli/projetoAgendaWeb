import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-cadastro-tarefas',
  imports: [
    CommonModule,
  ],
  templateUrl: './cadastro-tarefas.component.html',
  styleUrl: './cadastro-tarefas.component.css'
})
export class CadastroTarefasComponent {
  ngHttp = inject(HttpClient);

  categorias: any[] = [];

  ngOnInit() {
    this.ngHttp.get("http://localhost:8081/api/v1/categorias")
      .subscribe(data => {
        this.categorias = data as any[];
      })
  }
}
